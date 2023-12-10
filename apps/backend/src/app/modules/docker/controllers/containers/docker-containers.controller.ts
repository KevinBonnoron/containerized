import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { CreateContainerDto, RunContainerDto } from '../../dtos';
import { DockerContainersService } from '../../services';

@Controller('/containers')
export class DockerContainersController {
  constructor(
    private readonly dockerContainersService: DockerContainersService
  ) {}

  @Get()
  getAll() {
    return this.dockerContainersService.findAll();
  }

  @Get('/:id')
  getOneById(@Param('id') id: string) {
    return this.dockerContainersService.findOneById(id);
  }

  @Post()
  create(@Body() createContainerDto: CreateContainerDto) {
    return this.dockerContainersService.create(createContainerDto);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    return this.dockerContainersService.delete(id);
  }

  @Post('/:id/start')
  start(@Param('id') id: string) {
    return this.dockerContainersService.start(id);
  }

  @Post('/:id/stop')
  stop(@Param('id') id: string) {
    return this.dockerContainersService.stop(id);
  }

  @Post('/run')
  run(@Body() runContainerDto: RunContainerDto) {
    return this.dockerContainersService.run(runContainerDto);
  }

  @Post('/prune')
  prune() {
    return this.dockerContainersService.prune();
  }
}