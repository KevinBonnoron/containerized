import { IsOptional, IsString, Length } from 'class-validator';

export class PullImageDto {
  @IsString()
  @Length(1)
  image: string;

  @IsString()
  @Length(1)
  @IsOptional()
  tag?: string = 'latest';
}
