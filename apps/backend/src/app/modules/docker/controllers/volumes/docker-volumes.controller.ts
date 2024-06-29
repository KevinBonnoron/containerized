import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateVolumeDto } from '../../dtos';
import { DockerVolumesService } from '../../services';

@Controller('/volumes')
@ApiTags('docker volumes')
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
  @ApiCreatedResponse({ description: 'The volume has been successfully created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  create(@Body() createVolumeDto: CreateVolumeDto) {
    return this.dockerVolumesService.create(createVolumeDto);
  }

  @Delete('/:name')
  remove(@Param('name') name: string) {
    return this.dockerVolumesService.remove(name);
  }

  @Post('/prune')
  prune() {
    return this.dockerVolumesService.prune();
  }
}
