export interface DockerImageDto {
  id: string;
  labels: Record<string, string>;
  tags: string[];
}

export type DockerImageDtos = DockerImageDto[];
