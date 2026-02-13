import { SetMetadata } from '@nestjs/common';
import { type Permission } from '@vidorra/types';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
