import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateNetworkDto {
  @IsString()
  @ApiProperty({ description: 'Name of the network' })
  name: string;

  @IsString()
  @ApiProperty()
  scope: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  driver?: string;
}