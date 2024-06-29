import { Transform } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';

import type { DockerContainerStatus } from '@containerized/shared';

import { transformToArray } from '../utils';

export class GetContainerQueryDto {
  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  ancestor?: string[];

  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  before?: string[];

  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  expose?: string[];

  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  exited?: number[];

  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  health?: ('starting' | 'healthy' | 'unhealthy' | 'none')[];

  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  id?: string[];

  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  isolation?: ('default' | 'process' | 'hyperv')[];

  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  'is-task'?: ('true' | 'false')[];

  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  label?: string[];

  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  name?: string[];

  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  network?: string[];

  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  publish?: string[];

  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  since?: string[];

  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  status?: DockerContainerStatus[];

  @Transform(transformToArray)
  @IsArray()
  @IsOptional()
  volume?: string[];
}
