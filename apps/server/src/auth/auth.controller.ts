import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { getPermissionsForRoles } from '@vidorra/types';
import { type Role } from '@prisma/client';
import { AuthService } from './auth.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: { role?: Role } | null) {
    if (!user) return null;
    return {
      ...user,
      permissions: getPermissionsForRoles([user.role]),
    };
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @CurrentUser() user: { id: string; role?: Role } | null,
    @Body() dto: UpdateProfileDto,
  ) {
    if (!user) return null;
    const updated = await this.authService.updateProfile(user.id, dto);
    return {
      ...updated,
      permissions: getPermissionsForRoles([updated.role]),
    };
  }
}
