import { IsOptional, IsString, Length } from 'class-validator';

export class RunContainerDto {
  @IsString()
  @Length(1)
  image: string;

  @IsString()
  @Length(1)
  @IsOptional()
  tag?: string = 'latest';

  @IsString()
  @Length(1)
  @IsOptional()
  name?: string;
}