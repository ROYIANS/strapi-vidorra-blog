import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  @MaxLength(80)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2048)
  avatar?: string;

  @IsString()
  @IsOptional()
  @MaxLength(280)
  bio?: string;
}
