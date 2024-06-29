export interface DockerNetworkDto {
  id: string;
  name: string;
  scope: string;
  driver: string;
  enableIPv6: boolean;
  system: boolean;
}

export type DockerNetworkDtos = DockerNetworkDto[];
