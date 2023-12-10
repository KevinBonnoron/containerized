export interface DockerVolumeDto {
  name: string;
  labels: Record<string, string>;
  driver: string;
  mountPoint: string;
  scope: string;
}

export type DockerVolumeDtos = DockerVolumeDto[];
