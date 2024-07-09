interface BaseRegistryDto {
  id: number;
  name: string;
}

interface DockerHubRegistryDto extends BaseRegistryDto {
  type: 'dockerhub';
  username: string;
  accessToken: string;
}

interface GitlabRegistryDto extends BaseRegistryDto {
  type: 'gitlab';
  username: string;
  accessToken: string;
}

interface CustomRegistryDto extends BaseRegistryDto {
  type: 'custom';
  url: string;
  username: string;
  password: string;
}

export type RegistryDto = DockerHubRegistryDto | GitlabRegistryDto | CustomRegistryDto;
export type RegistryType = RegistryDto['type'];
