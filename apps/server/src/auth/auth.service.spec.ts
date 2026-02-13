import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: {
    $transaction: jest.Mock;
    post: {
      updateMany: jest.Mock;
    };
    mood: {
      updateMany: jest.Mock;
    };
    user: {
      findUnique: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      count: jest.Mock;
      delete: jest.Mock;
      deleteMany: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      $transaction: jest.fn(),
      post: {
        updateMany: jest.fn(),
      },
      mood: {
        updateMany: jest.fn(),
      },
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        count: jest.fn(),
        delete: jest.fn(),
        deleteMany: jest.fn(),
      },
    };
    prisma.$transaction.mockImplementation(async (cb: (tx: typeof prisma) => unknown) => cb(prisma));

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
        bio: 'Existing bio',
        role: 'ADMIN',
        avatar: null,
      })
      .mockResolvedValueOnce(null);
    prisma.user.update.mockResolvedValue({
      id: 'db-id-1',
      clerkId: 'user_abc',
      email: 'admin@example.com',
      username: 'admin',
      name: 'Old Name',
      bio: 'Existing bio',
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
        name: 'Old Name',
        avatar: 'https://example.com/a.png',
      },
      select: {
        id: true,
        clerkId: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        role: true,
        avatar: true,
      },
    });
    expect(result).toEqual({
      id: 'db-id-1',
      clerkId: 'user_abc',
      email: 'admin@example.com',
      username: 'admin',
      name: 'Old Name',
      bio: 'Existing bio',
      role: 'ADMIN',
      avatar: 'https://example.com/a.png',
    });
  });

  it('merges fallback user into existing email user when clerk email becomes available', async () => {
    prisma.user.findUnique
      .mockResolvedValueOnce({
        id: 'fallback-id',
        clerkId: 'user_clerk',
        email: 'user_clerk@clerk.local',
        username: 'clerk_user_clerk',
        name: 'clerk_user_clerk',
        bio: null,
        role: 'READER',
        avatar: null,
      })
      .mockResolvedValueOnce({
        id: 'existing-id',
        role: 'ADMIN',
        name: 'Royians',
        avatar: null,
      });
    prisma.user.update.mockResolvedValueOnce({
      id: 'existing-id',
      clerkId: 'user_clerk',
      email: '1294686101@qq.com',
      username: 'royians',
      name: 'Royians',
      bio: null,
      role: 'ADMIN',
      avatar: null,
    });

    const result = await service.validateClerkUser({
      sub: 'user_clerk',
      email: '1294686101@qq.com',
      username: 'royians',
      name: 'Royians',
    });

    expect(prisma.post.updateMany).toHaveBeenCalledWith({
      where: { authorId: 'fallback-id' },
      data: { authorId: 'existing-id' },
    });
    expect(prisma.mood.updateMany).toHaveBeenCalledWith({
      where: { userId: 'fallback-id' },
      data: { userId: 'existing-id' },
    });
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'existing-id' },
      data: {
        clerkId: 'user_clerk',
        username: 'royians',
        name: 'Royians',
        avatar: null,
        role: 'ADMIN',
      },
      select: {
        id: true,
        clerkId: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        role: true,
        avatar: true,
      },
    });
    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { id: 'fallback-id' },
    });
    expect(result).toEqual({
      id: 'existing-id',
      clerkId: 'user_clerk',
      email: '1294686101@qq.com',
      username: 'royians',
      name: 'Royians',
      bio: null,
      role: 'ADMIN',
      avatar: null,
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
      bio: null,
      role: 'EDITOR',
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
        bio: true,
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
      bio: null,
      role: 'EDITOR',
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
      bio: null,
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
        bio: true,
        role: true,
        avatar: true,
      },
    });
    expect(prisma.user.create.mock.calls[0][0].data).not.toHaveProperty('password');
    expect(result).toEqual({
      id: 'db-id-2',
      clerkId: 'user_first',
      email: 'first@example.com',
      username: 'first_user',
      name: 'first_user',
      bio: null,
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
      bio: null,
      role: 'READER',
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
        role: 'READER',
      }),
      select: {
        id: true,
        clerkId: true,
        email: true,
        username: true,
        name: true,
        bio: true,
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

  it('recovers from concurrent create unique conflict by retrying sync', async () => {
    prisma.user.findUnique
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce({
        id: 'db-id-race',
        clerkId: 'user_race',
        email: 'race@example.com',
        username: 'race_user',
        name: 'Race User',
        bio: null,
        role: 'EDITOR',
        avatar: null,
      });
    prisma.user.count.mockResolvedValueOnce(2);
    prisma.user.create.mockRejectedValueOnce({
      code: 'P2002',
    });
    prisma.user.update.mockResolvedValueOnce({
      id: 'db-id-race',
      clerkId: 'user_race',
      email: 'race@example.com',
      username: 'race_user',
      name: 'Race User',
      bio: null,
      role: 'EDITOR',
      avatar: null,
    });

    const result = await service.validateClerkUser({
      sub: 'user_race',
      email: 'race@example.com',
      username: 'race_user',
      name: 'Race User',
    });

    expect(prisma.user.create).toHaveBeenCalledTimes(1);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'db-id-race' },
      data: {
        email: 'race@example.com',
        username: 'race_user',
        name: 'Race User',
        avatar: null,
      },
      select: {
        id: true,
        clerkId: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        role: true,
        avatar: true,
      },
    });
    expect(result).toEqual({
      id: 'db-id-race',
      clerkId: 'user_race',
      email: 'race@example.com',
      username: 'race_user',
      name: 'Race User',
      bio: null,
      role: 'EDITOR',
      avatar: null,
    });
  });

  it('keeps customized name and avatar when clerk payload changes', async () => {
    prisma.user.findUnique.mockResolvedValueOnce({
      id: 'db-id-custom',
      clerkId: 'user_custom',
      email: 'custom@example.com',
      username: 'custom_user',
      name: 'Custom Name',
      bio: 'My bio',
      role: 'EDITOR',
      avatar: 'https://example.com/custom.png',
    });
    prisma.user.update.mockResolvedValue({
      id: 'db-id-custom',
      clerkId: 'user_custom',
      email: 'custom@example.com',
      username: 'custom_user',
      name: 'Custom Name',
      bio: 'My bio',
      role: 'EDITOR',
      avatar: 'https://example.com/custom.png',
    });

    await service.validateClerkUser({
      sub: 'user_custom',
      email: 'custom@example.com',
      username: 'custom_user',
      name: 'Clerk Name',
      image_url: 'https://example.com/clerk.png',
    });

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'db-id-custom' },
      data: {
        email: 'custom@example.com',
        username: 'custom_user',
        name: 'Custom Name',
        avatar: 'https://example.com/custom.png',
      },
      select: {
        id: true,
        clerkId: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        role: true,
        avatar: true,
      },
    });
  });

  it('updates current user profile fields', async () => {
    prisma.user.update.mockResolvedValue({
      id: 'db-id-profile',
      clerkId: 'user_profile',
      email: 'profile@example.com',
      username: 'profile_user',
      name: 'Joshua',
      bio: 'Building in public.',
      role: 'READER',
      avatar: 'https://example.com/avatar.png',
    });

    const result = await service.updateProfile('db-id-profile', {
      name: '  Joshua  ',
      bio: '  Building in public.  ',
      avatar: '  https://example.com/avatar.png  ',
    });

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'db-id-profile' },
      data: {
        name: 'Joshua',
        bio: 'Building in public.',
        avatar: 'https://example.com/avatar.png',
      },
      select: {
        id: true,
        clerkId: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        role: true,
        avatar: true,
      },
    });
    expect(result).toEqual({
      id: 'db-id-profile',
      clerkId: 'user_profile',
      email: 'profile@example.com',
      username: 'profile_user',
      name: 'Joshua',
      bio: 'Building in public.',
      role: 'READER',
      avatar: 'https://example.com/avatar.png',
    });
  });

  it('allows clearing optional profile fields', async () => {
    prisma.user.update.mockResolvedValue({
      id: 'db-id-profile',
      clerkId: 'user_profile',
      email: 'profile@example.com',
      username: 'profile_user',
      name: null,
      bio: null,
      role: 'READER',
      avatar: null,
    });

    await service.updateProfile('db-id-profile', {
      name: '  ',
      bio: '',
      avatar: '   ',
    });

    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'db-id-profile' },
      data: {
        name: null,
        bio: null,
        avatar: null,
      },
      select: {
        id: true,
        clerkId: true,
        email: true,
        username: true,
        name: true,
        bio: true,
        role: true,
        avatar: true,
      },
    });
  });
});
