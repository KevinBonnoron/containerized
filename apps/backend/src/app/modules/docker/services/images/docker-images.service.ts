import { Injectable } from '@nestjs/common';

import { DockerImagesAdapter } from '../../adapters';
import { PullImageDto } from '../../dtos';
import { DockerService } from '../docker/docker.service';

@Injectable()
export class DockerImagesService {
  constructor(
    private readonly dockerService: DockerService
  ) {}

  async findAll() {
    const imageInfos = await this.dockerService.listImages();
    return imageInfos.map(DockerImagesAdapter.toDto);
  }

  async pull({ image, tag }: PullImageDto) {
    return this.dockerService.pull(`${image}:${tag}`);
  }

  pruneImages() {
    return this.dockerService.pruneImages({ filters: { dangling: { false: true } } });
  }
}
