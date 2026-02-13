import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEnum(['USER', 'ADMIN', 'EDITOR'])
  @IsOptional()
  role?: 'USER' | 'ADMIN' | 'EDITOR';

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
