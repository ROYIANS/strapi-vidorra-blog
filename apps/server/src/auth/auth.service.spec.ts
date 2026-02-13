import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: {
    user: {
      findUnique: jest.Mock;
      create: jest.Mock;
      count: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        count: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('returns existing user by clerk id', async () => {
    const existingUser = {
      id: 'db-id-1',
      clerkId: 'user_abc',
      email: 'admin@example.com',
      username: 'admin',
      name: 'Admin',
      role: 'ADMIN',
      avatar: null,
    };
    prisma.user.findUnique.mockResolvedValue(existingUser);

    const result = await service.validateClerkUser({
      sub: 'user_abc',
      email: 'admin@example.com',
      username: 'admin',
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { clerkId: 'user_abc' },
      select: {
        id: true,
        clerkId: true,
        email: true,
        username: true,
        name: true,
        role: true,
        avatar: true,
      },
    });
    expect(result).toEqual(existingUser);
  });

  it('creates first clerk user as admin', async () => {
    prisma.user.findUnique.mockResolvedValueOnce(null);
    prisma.user.count.mockResolvedValueOnce(0);

    const createdUser = {
      id: 'db-id-2',
      clerkId: 'user_first',
      email: 'first@example.com',
      username: 'first_user',
      name: 'first_user',
      role: 'ADMIN',
      avatar: null,
    };
    prisma.user.create.mockResolvedValue(createdUser);

    const result = await service.validateClerkUser({
      sub: 'user_first',
      email: 'first@example.com',
      username: 'first_user',
    });

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        clerkId: 'user_first',
        email: 'first@example.com',
        username: 'first_user',
        role: 'ADMIN',
      }),
      select: {
        id: true,
        clerkId: true,
        email: true,
        username: true,
        name: true,
        role: true,
        avatar: true,
      },
    });
    expect(result).toEqual(createdUser);
  });

  it('uses fallback email and username when claims are missing', async () => {
    prisma.user.findUnique.mockResolvedValueOnce(null);
    prisma.user.count.mockResolvedValueOnce(2);
    prisma.user.create.mockResolvedValue({
      id: 'db-id-3',
      clerkId: 'user_missing_claims',
      email: 'user_missing_claims@clerk.local',
      username: 'clerk_user_missing_claims',
      name: 'clerk_user_missing_claims',
      role: 'USER',
      avatar: null,
    });

    await service.validateClerkUser({
      sub: 'user_missing_claims',
    });

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        clerkId: 'user_missing_claims',
        email: 'user_missing_claims@clerk.local',
        username: 'clerk_user_missing_claims',
        role: 'USER',
      }),
      select: {
        id: true,
        clerkId: true,
        email: true,
        username: true,
        name: true,
        role: true,
        avatar: true,
      },
    });
  });
});
