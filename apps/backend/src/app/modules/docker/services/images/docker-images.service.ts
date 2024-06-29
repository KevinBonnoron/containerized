import { Injectable, NotFoundException } from '@nestjs/common';

import { DockerImagesAdapter } from '../../adapters';
import type { GetImageQueryDto, PullImageDto } from '../../dtos';
import { DockerService } from '../docker/docker.service';

@Injectable()
export class DockerImagesService {
  constructor(
    private readonly dockerService: DockerService
  ) {}

  async findAll(query: GetImageQueryDto = {}) {
    const imageInfos = await this.dockerService.listImages({ all: true, filters: query });
    return imageInfos.map(DockerImagesAdapter.toDto);
  }

  async remove(id: string) {
    const image = this.dockerService.getImage(id);
    if (image === undefined) {
      throw new NotFoundException();
    }

    return await image.remove({ force: true });
  }

  async pull({ image, tag }: PullImageDto) {
    return this.dockerService.pull(`${image}:${tag}`);
  }

  pruneImages() {
    return this.dockerService.pruneImages({ filters: { dangling: { false: true } } });
  }
}
