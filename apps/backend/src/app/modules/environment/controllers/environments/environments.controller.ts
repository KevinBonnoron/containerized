import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CreateEnvironmentDto } from '../../dtos';
import { EnvironmentsService } from '../../services';

@Controller('/environments')
export class EnvironmentsController {
  constructor(
    private readonly environmentsService: EnvironmentsService
  ) {}

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
}
