import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface ClerkJwtPayload {
  sub: string;
  email?: string;
  username?: string;
  name?: string;
  given_name?: string;
  family_name?: string;
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
    const clerkId = payload?.sub;
    if (!clerkId) return null;

    const existingUser = await this.prisma.user.findUnique({
      where: { clerkId },
      select: USER_SELECT,
    });

    if (existingUser) {
      return existingUser;
    }

    const username = this.getUsername(payload);
    const email = this.getEmail(payload, clerkId);
    const name = this.getName(payload, username);
    const usersCount = await this.prisma.user.count();

    return this.prisma.user.create({
      data: {
        clerkId,
        email,
        username,
        name,
        // Local password is no longer used after Clerk migration.
        password: `CLERK_AUTH_ONLY_${clerkId}`,
        role: usersCount === 0 ? 'ADMIN' : 'USER',
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
}
