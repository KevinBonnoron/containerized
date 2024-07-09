import type { PipeTransform } from '@nestjs/common';

import type { EnvironmentsService } from '../services';

export class EnvironmentPipe implements PipeTransform {
  constructor(private readonly environmentsService: EnvironmentsService) {}

  transform(value: number) {
    return this.environmentsService.findOneById(value);
  }
}
