import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateVolumeDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  driver?: string;

  @IsObject()
  @IsOptional()
  labels?: Record<string, string>;
}