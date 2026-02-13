import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

interface ClerkJwtPayload {
  sub: string;
  email?: string;
  username?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
  image_url?: string;
  [key: string]: unknown;
}

const USER_SELECT = {
  id: true,
  clerkId: true,
  email: true,
  username: true,
  name: true,
  bio: true,
  role: true,
  avatar: true,
} as const;

type SyncedUser = Prisma.UserGetPayload<{
  select: typeof USER_SELECT;
}>;

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateClerkUser(payload: ClerkJwtPayload): Promise<SyncedUser | null> {
    return this.syncClerkUser(payload);
  }

  async syncClerkUser(
    payload: ClerkJwtPayload,
    hasRetried = false,
  ): Promise<SyncedUser | null> {
    const clerkId = payload?.sub;
    if (!clerkId) return null;

    const existingByClerkId = await this.prisma.user.findUnique({
      where: { clerkId },
      select: USER_SELECT,
    });

    const username = this.getUsername(payload);
    const email = this.getEmail(payload, clerkId);
    const name = this.getName(payload, username);
    const avatar = payload.image_url;

    if (existingByClerkId) {
      const updatedUsername = payload.username ? username : existingByClerkId.username;
      const updatedEmail = payload.email ? email : existingByClerkId.email;
      const updatedName =
        existingByClerkId.name ??
        this.getUpdatedName(payload, updatedUsername, existingByClerkId.name);
      const updatedAvatar = existingByClerkId.avatar ?? avatar ?? null;
      const shouldResolveEmailCollision =
        Boolean(payload.email) && updatedEmail !== existingByClerkId.email;

      if (shouldResolveEmailCollision) {
        const existingByEmail = await this.prisma.user.findUnique({
          where: { email: updatedEmail },
          select: {
            id: true,
            role: true,
            name: true,
            avatar: true,
          },
        });

        if (existingByEmail && existingByEmail.id !== existingByClerkId.id) {
          return this.mergeDuplicateUsers({
            sourceUserId: existingByClerkId.id,
            sourceUserRole: existingByClerkId.role,
            targetUserId: existingByEmail.id,
            targetUserRole: existingByEmail.role,
            targetUserName: existingByEmail.name,
            targetUserAvatar: existingByEmail.avatar,
            clerkId,
            username: updatedUsername,
            name: updatedName,
            avatar: updatedAvatar,
          });
        }
      }

      try {
        return await this.prisma.user.update({
          where: { id: existingByClerkId.id },
          data: {
            email: updatedEmail,
            username: updatedUsername,
            name: updatedName,
            avatar: updatedAvatar,
          },
          select: USER_SELECT,
        });
      } catch (error: unknown) {
        if (!hasRetried && this.isUniqueConstraintError(error)) {
          return this.syncClerkUser(payload, true);
        }
        throw error;
      }
    }

    const existingByEmail = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
      },
    });

    if (existingByEmail) {
      return this.prisma.user.update({
        where: { id: existingByEmail.id },
        data: {
          clerkId,
          username,
          name,
          avatar,
        },
        select: USER_SELECT,
      });
    }

    const usersCount = await this.prisma.user.count();

    try {
      return await this.prisma.user.create({
        data: {
          clerkId,
          email,
          username,
          name,
          avatar,
          role: usersCount === 0 ? 'ADMIN' : 'READER',
        },
        select: USER_SELECT,
      });
    } catch (error: unknown) {
      if (!hasRetried && this.isUniqueConstraintError(error)) {
        // Concurrent sync may create the same user in another request.
        // Retry once to re-enter lookup/update path.
        return this.syncClerkUser(payload, true);
      }
      throw error;
    }
  }

  async deleteClerkUser(clerkId: string) {
    if (!clerkId) return;

    await this.prisma.user.deleteMany({
      where: { clerkId },
    });
  }

  async updateProfile(
    userId: string,
    profile: {
      name?: string;
      avatar?: string;
      bio?: string;
    },
  ): Promise<SyncedUser> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(profile.name !== undefined
          ? { name: this.sanitizeOptionalText(profile.name) }
          : {}),
        ...(profile.avatar !== undefined
          ? { avatar: this.sanitizeOptionalText(profile.avatar) }
          : {}),
        ...(profile.bio !== undefined
          ? { bio: this.sanitizeOptionalText(profile.bio) }
          : {}),
      },
      select: USER_SELECT,
    });
  }

  private getEmail(payload: ClerkJwtPayload, clerkId: string) {
    return payload.email ?? `${clerkId}@clerk.local`;
  }

  private getUsername(payload: ClerkJwtPayload) {
    if (payload.username) return payload.username;
    return `clerk_${payload.sub}`.slice(0, 30);
  }

  private getName(payload: ClerkJwtPayload, username: string) {
    const first = payload.given_name?.trim();
    const last = payload.family_name?.trim();
    if (payload.name?.trim()) return payload.name.trim();
    if (first || last) return `${first ?? ''} ${last ?? ''}`.trim();
    return username;
  }

  private getUpdatedName(payload: ClerkJwtPayload, username: string, currentName: string | null) {
    if (payload.name?.trim()) return payload.name.trim();
    if (payload.given_name?.trim() || payload.family_name?.trim()) {
      return this.getName(payload, username);
    }
    return currentName ?? username;
  }

  private isUniqueConstraintError(error: unknown) {
    return (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      (error as { code?: string }).code === 'P2002'
    );
  }

  private sanitizeOptionalText(value: string) {
    const trimmed = value.trim();
    return trimmed.length === 0 ? null : trimmed;
  }

  private async mergeDuplicateUsers(params: {
    sourceUserId: string;
    sourceUserRole: Role;
    targetUserId: string;
    targetUserRole: Role;
    targetUserName: string | null;
    targetUserAvatar: string | null;
    clerkId: string;
    username: string;
    name: string | null;
    avatar: string | null;
  }): Promise<SyncedUser> {
    const mergedRole = this.getHigherRole(params.sourceUserRole, params.targetUserRole);

    return this.prisma.$transaction(async tx => {
      await tx.post.updateMany({
        where: { authorId: params.sourceUserId },
        data: { authorId: params.targetUserId },
      });

      await tx.mood.updateMany({
        where: { userId: params.sourceUserId },
        data: { userId: params.targetUserId },
      });

      const updated = await tx.user.update({
        where: { id: params.targetUserId },
        data: {
          clerkId: params.clerkId,
          username: params.username,
          name: params.targetUserName ?? params.name,
          avatar: params.targetUserAvatar ?? params.avatar,
          role: mergedRole,
        },
        select: USER_SELECT,
      });

      await tx.user.delete({
        where: { id: params.sourceUserId },
      });

      return updated;
    });
  }

  private getHigherRole(first: Role, second: Role): Role {
    const rank: Record<Role, number> = {
      READER: 1,
      EDITOR: 2,
      ADMIN: 3,
    };
    return rank[first] >= rank[second] ? first : second;
  }
}
