import { IsString } from 'class-validator';

export class RenameContainerDto {
  @IsString()
  name: string;
}
