import { Injectable } from '@nestjs/common';
import { DockerSystemAdapter } from '../../adapters';
import { DockerService } from '../docker/docker.service';

@Injectable()
export class DockerSystemService {
  constructor(
    private readonly dockerService: DockerService
  ) {}

  async getInfo() {
    const info = await this.dockerService.info();
    return DockerSystemAdapter.toDto(info);
  }

  getVersion() {
    return this.dockerService.version();
  }

  getPing() {
    return this.dockerService.ping();
  }
}
