import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Query } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { GetImageQueryDto, PullImageDto } from '../../dtos';
import { DockerImagesService } from '../../services';

@Controller('/images')
@ApiTags('docker images')
export class DockerImagesController {
  constructor(
    private readonly dockerImagesService: DockerImagesService
  ) {}

  @Get()
  findAll(@Query() query: GetImageQueryDto) {
    return this.dockerImagesService.findAll(query);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.dockerImagesService.remove(id);
  }

  @Post('/pull')
  pull(@Body() pullImageDto: PullImageDto) {
    return this.dockerImagesService.pull(pullImageDto)
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