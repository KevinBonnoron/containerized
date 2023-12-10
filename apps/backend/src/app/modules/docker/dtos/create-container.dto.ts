import { IsOptional, IsString, Length } from 'class-validator';

export class CreateContainerDto {
  @IsString()
  @Length(1)
  image: string;

  @IsString()
  @IsOptional()
  name?: string;
}
