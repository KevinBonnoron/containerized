import { Transform } from 'class-transformer';
import { IsArray, IsBoolean, IsOptional } from 'class-validator';

import { transformToArray } from '../utils';

export class GetImageQueryDto {
  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  before?: string[];

  @IsBoolean()
  @IsOptional()
  dangling?: true;

  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  label?: string[];

  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  reference?: string[];

  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  since?: string[];
}
