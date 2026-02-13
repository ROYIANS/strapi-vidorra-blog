import { Injectable } from '@nestjs/common';
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
  role: true,
  avatar: true,
} as const;

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateClerkUser(payload: ClerkJwtPayload) {
    return this.syncClerkUser(payload);
  }

  async syncClerkUser(payload: ClerkJwtPayload) {
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
      const updatedName = this.getUpdatedName(payload, updatedUsername, existingByClerkId.name);

      return this.prisma.user.update({
        where: { id: existingByClerkId.id },
        data: {
          email: updatedEmail,
          username: updatedUsername,
          name: updatedName,
          avatar: avatar ?? existingByClerkId.avatar,
        },
        select: USER_SELECT,
      });
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

    return this.prisma.user.create({
      data: {
        clerkId,
        email,
        username,
        name,
        avatar,
        // Local password is no longer used after Clerk migration.
        password: `CLERK_AUTH_ONLY_${clerkId}`,
        role: usersCount === 0 ? 'ADMIN' : 'USER',
      },
      select: USER_SELECT,
    });
  }

  async deleteClerkUser(clerkId: string) {
    if (!clerkId) return;

    await this.prisma.user.deleteMany({
      where: { clerkId },
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
}
