import { DockerContainerPort, DockerContainerVolume } from '@containerized/shared';
import { IsArray, IsOptional, IsString, Length } from 'class-validator';
import { IsDockerContainerPort, IsDockerContainerVolume } from '../decorators';

export class RunContainerDto {
  @IsString()
  @Length(1)
  image: string;

  @IsOptional()
  @IsString()
  @Length(1)
  name?: string;

  @IsOptional()
  @IsArray()
  @IsDockerContainerVolume({ each: true })
  volumes: DockerContainerVolume[];

  @IsOptional()
  @IsArray()
  @IsDockerContainerPort({ each: true })
  ports: DockerContainerPort[];
}
