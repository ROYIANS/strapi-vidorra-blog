import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: {
    user: {
      findUnique: jest.Mock;
      findMany: jest.Mock;
      count: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('prevents deleting yourself', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'user_1',
      role: 'ADMIN',
      isActive: true,
    });

    await expect(service.remove('user_1', 'user_1')).rejects.toBeInstanceOf(
      ForbiddenException,
    );
    expect(prisma.user.delete).not.toHaveBeenCalled();
  });

  it('prevents deleting the last admin', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'user_2',
      role: 'ADMIN',
      isActive: true,
    });
    prisma.user.count.mockResolvedValue(1);

    await expect(service.remove('user_2', 'user_1')).rejects.toBeInstanceOf(
      ConflictException,
    );
    expect(prisma.user.delete).not.toHaveBeenCalled();
  });

  it('prevents demoting the last admin', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'user_2',
      role: 'ADMIN',
      isActive: true,
    });
    prisma.user.count.mockResolvedValue(1);

    await expect(
      service.update('user_2', { role: 'USER' }, 'user_1'),
    ).rejects.toBeInstanceOf(ConflictException);
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it('prevents disabling the last admin', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'user_2',
      role: 'ADMIN',
      isActive: true,
    });
    prisma.user.count.mockResolvedValue(1);

    await expect(
      service.update('user_2', { isActive: false }, 'user_1'),
    ).rejects.toBeInstanceOf(ConflictException);
    expect(prisma.user.update).not.toHaveBeenCalled();
  });
});
