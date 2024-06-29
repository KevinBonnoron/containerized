import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class CreateVolumeDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Name of the volume' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  driver?: string;

  @IsObject()
  @IsOptional()
  @ApiPropertyOptional()
  labels?: Record<string, string>;
}
