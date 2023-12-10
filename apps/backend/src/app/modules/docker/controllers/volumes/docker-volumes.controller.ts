import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateVolumeDto } from '../../dtos';
import { DockerVolumesService } from '../../services';

@Controller('/volumes')
export class DockerVolumesController {
  constructor(
    private readonly dockerVolumesService: DockerVolumesService
  ) {}

  @Get()
  getAll() {
    return this.dockerVolumesService.findAll();
  }

  @Get('/:name')
  getOneByName(@Param('name') name: string) {
    return this.dockerVolumesService.findOneByName(name);
  }

  @Post()
  create(@Body() createVolumeDto: CreateVolumeDto) {
    return this.dockerVolumesService.create(createVolumeDto);
  }

  @Delete('/:name')
  delete(@Param('name') name: string) {
    return this.dockerVolumesService.delete(name);
  }

  @Post('/prune')
  prune() {
    return this.dockerVolumesService.prune();
  }
}
