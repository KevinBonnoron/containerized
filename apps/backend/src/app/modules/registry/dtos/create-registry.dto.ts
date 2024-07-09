import { IsString, MinLength } from 'class-validator';

class BaseCreateRegistryDto {
  @IsString()
  @MinLength(1)
  name: string;
}

export class CreateDockerHubRegistryDto extends BaseCreateRegistryDto {
  @IsString()
  type: 'dockerhub';

  @IsString()
  username: string;

  @IsString()
  accessToken: string;
}

export class CreateGitlabRegistryDto extends BaseCreateRegistryDto {
  @IsString()
  type: 'gitlab';

  @IsString()
  username: string;

  @IsString()
  accessToken: string;
}

export class CreateCustomRegistryDto extends BaseCreateRegistryDto {
  @IsString()
  type: 'custom';

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  url: string;
}

export type CreateRegistryDto = CreateDockerHubRegistryDto | CreateGitlabRegistryDto | CreateCustomRegistryDto;
