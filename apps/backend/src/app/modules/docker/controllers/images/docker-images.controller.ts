import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';

import { PullImageDto } from '../../dtos';
import { DockerImagesService } from '../../services';

@Controller('/images')
export class DockerImagesController {
  constructor(
    private readonly dockerImagesService: DockerImagesService
  ) {}

  @Get()
  getAll() {
    return this.dockerImagesService.findAll();
  }

  @Post('/pull')
  async pull(@Body() pullImageDto: PullImageDto) {
    return await this.dockerImagesService.pull(pullImageDto)
      .then(() => ({ success: true }))
      .catch((error) => {
        throw new NotFoundException({ success: false, message: error });
      });
  }

  @Post('/prune')
  prune() {
    return this.dockerImagesService.pruneImages();
  }
}