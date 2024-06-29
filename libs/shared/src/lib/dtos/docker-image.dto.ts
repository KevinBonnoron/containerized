import { createBuilder } from 'monadojs';

export interface DockerImageDto {
  id: string;
  labels: Record<string, string>;
  tags: string[];
  used: boolean;
}

export type DockerImageDtos = DockerImageDto[];

export const dockerImageDtoBuilder = createBuilder<DockerImageDto>();
