import { PipeTransform } from '@nestjs/common';

import { EnvironmentsService } from '../services';

export class EnvironmentPipe implements PipeTransform {
  constructor(
    private readonly environmentsService: EnvironmentsService
  ) {}

  transform(value: number) {
    return this.environmentsService.findOneById(value);
  }
}
