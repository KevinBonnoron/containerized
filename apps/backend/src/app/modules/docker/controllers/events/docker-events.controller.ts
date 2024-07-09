import { Controller, Get } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { DockerEventsService } from '../../services';

@Controller('/events')
@ApiTags('docker events')
export class DockerEventsController {
  constructor(private readonly dockerEventsService: DockerEventsService) {}

  @Get()
  getAll() {
    return this.dockerEventsService.findAll();
  }
}
