import { IsString, MinLength } from 'class-validator';

class BaseUpdateRegistryDto {
  @IsString()
  @MinLength(1)
  name: string;
}

export class UpdateDockerHubRegistryDto extends BaseUpdateRegistryDto {
  @IsString()
  type: 'dockerhub';

  @IsString()
  username: string;

  @IsString()
  accessToken: string;
}

export class UpdateGitlabRegistryDto extends BaseUpdateRegistryDto {
  @IsString()
  type: 'gitlab';

  @IsString()
  username: string;

  @IsString()
  accessToken: string;
}

export class UpdateCustomRegistryDto extends BaseUpdateRegistryDto {
  @IsString()
  type: 'custom';

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  url: string;
}

export type UpdateRegistryDto = UpdateDockerHubRegistryDto | UpdateGitlabRegistryDto | UpdateCustomRegistryDto;
