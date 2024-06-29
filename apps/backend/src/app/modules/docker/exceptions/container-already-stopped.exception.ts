import { HttpException, HttpStatus } from '@nestjs/common';

export class ContainerAlreadyStoppedException extends HttpException {
  constructor(objectOrError?: string | object | any) {
    super(objectOrError, HttpStatus.BAD_REQUEST);
  }
}
