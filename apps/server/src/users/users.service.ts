import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          clerkId: true,
          email: true,
          username: true,
          name: true,
          avatar: true,
          bio: true,
          role: true,
          isActive: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      this.prisma.user.count(),
    ]);

    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        clerkId: true,
        email: true,
        username: true,
        name: true,
        avatar: true,
        bio: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto, actorId: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isSelfAction = actorId === id;
    if (isSelfAction && updateUserDto.role && updateUserDto.role !== 'ADMIN') {
      throw new ForbiddenException('You cannot change your own admin role');
    }
    if (isSelfAction && updateUserDto.isActive === false) {
      throw new ForbiddenException('You cannot deactivate your own account');
    }

    const isDemotingAdmin =
      user.role === 'ADMIN' &&
      user.isActive &&
      updateUserDto.role !== undefined &&
      updateUserDto.role !== 'ADMIN';
    const isDeactivatingAdmin =
      user.role === 'ADMIN' && user.isActive && updateUserDto.isActive === false;
    if (isDemotingAdmin || isDeactivatingAdmin) {
      const activeAdminsCount = await this.prisma.user.count({
        where: {
          role: 'ADMIN',
          isActive: true,
        },
      });

      if (activeAdminsCount <= 1) {
        throw new ConflictException('Cannot modify the last active admin');
      }
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
      select: {
        id: true,
        clerkId: true,
        email: true,
        username: true,
        name: true,
        avatar: true,
        bio: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return updated;
  }

  async remove(id: string, actorId: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (actorId === id) {
      throw new ForbiddenException('You cannot delete your own account');
    }

    if (user.role === 'ADMIN' && user.isActive) {
      const activeAdminsCount = await this.prisma.user.count({
        where: {
          role: 'ADMIN',
          isActive: true,
        },
      });

      if (activeAdminsCount <= 1) {
        throw new ConflictException('Cannot delete the last active admin');
      }
    }

    await this.prisma.user.delete({ where: { id } });
  }
}
