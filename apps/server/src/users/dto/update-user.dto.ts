import { IsBoolean, IsEnum, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsEnum(['READER', 'EDITOR', 'ADMIN'])
  @IsOptional()
  role?: 'READER' | 'EDITOR' | 'ADMIN';

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
