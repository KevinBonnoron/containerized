import { Injectable } from '@nestjs/common';

import { DockerService } from '../docker/docker.service';

@Injectable()
export class DockerEventsService {
  constructor(private readonly dockerService: DockerService) {}

  findAll() {
    return this.dockerService.listEvents();
  }
}
