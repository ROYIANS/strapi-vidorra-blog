import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { type Role } from '@prisma/client';
import { type Permission, getPermissionsForRole } from '../authz/permissions';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<{ user?: { role?: Role } }>();
    if (!user?.role) {
      return false;
    }

    const granted = new Set(getPermissionsForRole(user.role));
    return requiredPermissions.every((permission) => granted.has(permission));
  }
}
