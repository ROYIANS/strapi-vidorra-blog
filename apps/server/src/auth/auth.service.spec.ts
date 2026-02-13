import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: {
    user: {
      findUnique: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      count: jest.Mock;
      deleteMany: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        count: jest.fn(),
        deleteMany: jest.fn(),
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

  it('updates existing user found by clerk id', async () => {
    prisma.user.findUnique
      .mockResolvedValueOnce({
        id: 'db-id-1',
        clerkId: 'user_abc',
        email: 'old@example.com',
        username: 'old_name',
        name: 'Old Name',
        role: 'ADMIN',
        avatar: null,
      })
      .mockResolvedValueOnce(null);
    prisma.user.update.mockResolvedValue({
      id: 'db-id-1',
      clerkId: 'user_abc',
      email: 'admin@example.com',
      username: 'admin',
      name: 'Admin',
      role: 'ADMIN',
      avatar: 'https://example.com/a.png',
    });

    const result = await service.validateClerkUser({
      sub: 'user_abc',
      email: 'admin@example.com',
      username: 'admin',
      given_name: 'Admin',
      image_url: 'https://example.com/a.png',
    });

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'db-id-1' },
      data: {
        email: 'admin@example.com',
        username: 'admin',
        name: 'Admin',
        avatar: 'https://example.com/a.png',
      },
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
    expect(result).toEqual({
      id: 'db-id-1',
      clerkId: 'user_abc',
      email: 'admin@example.com',
      username: 'admin',
      name: 'Admin',
      role: 'ADMIN',
      avatar: 'https://example.com/a.png',
    });
  });

  it('links existing local user by email before creating a new one', async () => {
    prisma.user.findUnique
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({ id: 'legacy-id' });
    prisma.user.update.mockResolvedValue({
      id: 'legacy-id',
      clerkId: 'user_email_link',
      email: 'legacy@example.com',
      username: 'legacy',
      name: 'Legacy User',
      role: 'USER',
      avatar: null,
    });

    const result = await service.validateClerkUser({
      sub: 'user_email_link',
      email: 'legacy@example.com',
      username: 'legacy',
      name: 'Legacy User',
    });

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'legacy-id' },
      data: {
        clerkId: 'user_email_link',
        username: 'legacy',
        name: 'Legacy User',
        avatar: undefined,
      },
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
    expect(result).toEqual({
      id: 'legacy-id',
      clerkId: 'user_email_link',
      email: 'legacy@example.com',
      username: 'legacy',
      name: 'Legacy User',
      role: 'USER',
      avatar: null,
    });
  });

  it('creates first clerk user as admin', async () => {
    prisma.user.findUnique.mockResolvedValueOnce(null).mockResolvedValueOnce(null);
    prisma.user.count.mockResolvedValueOnce(0);
    prisma.user.create.mockResolvedValue({
      id: 'db-id-2',
      clerkId: 'user_first',
      email: 'first@example.com',
      username: 'first_user',
      name: 'first_user',
      role: 'ADMIN',
      avatar: null,
    });

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
    expect(result).toEqual({
      id: 'db-id-2',
      clerkId: 'user_first',
      email: 'first@example.com',
      username: 'first_user',
      name: 'first_user',
      role: 'ADMIN',
      avatar: null,
    });
  });

  it('uses fallback email and username when claims are missing', async () => {
    prisma.user.findUnique.mockResolvedValueOnce(null).mockResolvedValueOnce(null);
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

  it('deletes local user by clerk id', async () => {
    await service.deleteClerkUser('user_delete_me');

    expect(prisma.user.deleteMany).toHaveBeenCalledWith({
      where: { clerkId: 'user_delete_me' },
    });
  });
});
