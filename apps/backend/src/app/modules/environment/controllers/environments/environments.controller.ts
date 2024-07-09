import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CreateEnvironmentDto, UpdateEnvironmentDto } from '../../dtos';
import { EnvironmentsService } from '../../services';

@Controller('/environments')
@ApiTags('environment')
export class EnvironmentsController {
  constructor(private readonly environmentsService: EnvironmentsService) {}

  @Get()
  getAll() {
    return this.environmentsService.findAll();
  }

  @Get('/:id')
  getOneById(@Param('id') id: number) {
    return this.environmentsService.findOneById(id);
  }

  @Post()
  create(@Body() createEnvironmentDto: CreateEnvironmentDto) {
    return this.environmentsService.create(createEnvironmentDto);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() updateEnvironmentDto: UpdateEnvironmentDto) {
    return this.environmentsService.update(id, updateEnvironmentDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.environmentsService.remove(id);
  }
}
