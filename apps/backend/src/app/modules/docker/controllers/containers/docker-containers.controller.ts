import { Body, Controller, Delete, Get, HttpCode, Param, Post, Query } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CreateContainerDto, GetContainerQueryDto, RenameContainerDto, RunContainerDto } from '../../dtos';
import { DockerContainersService } from '../../services';

@Controller('/containers')
@ApiTags('docker containers')
export class DockerContainersController {
  constructor(private readonly dockerContainersService: DockerContainersService) {}

  @Get()
  getAll(@Query() query?: GetContainerQueryDto) {
    return this.dockerContainersService.findAll(query);
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
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.dockerContainersService.remove(id);
  }

  @Get('/:id/logs')
  async logs(@Param('id') id: string) {
    return this.dockerContainersService.logs(id);
  }

  @Get('/:id/inspect')
  inspect(@Param('id') id: string) {
    return this.dockerContainersService.inspect(id);
  }

  @Post('/:id/start')
  @HttpCode(200)
  start(@Param('id') id: string) {
    return this.dockerContainersService.start(id);
  }

  @Post('/:id/stop')
  @HttpCode(200)
  stop(@Param('id') id: string) {
    return this.dockerContainersService.stop(id);
  }

  @Post('/:id/rename')
  @HttpCode(200)
  rename(@Param('id') id: string, @Body() renameContainerDto: RenameContainerDto) {
    return this.dockerContainersService.rename(id, renameContainerDto);
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
