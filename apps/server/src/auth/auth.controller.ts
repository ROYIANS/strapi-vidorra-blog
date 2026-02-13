import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { getPermissionsForRoles } from '../common/authz/permissions';
import { type Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: { role?: Role } | null) {
    if (!user) return null;
    return {
      ...user,
      permissions: getPermissionsForRoles([user.role]),
    };
  }
}
