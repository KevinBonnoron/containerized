import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CreateRegistryDto, UpdateRegistryDto } from '../../dtos';
import { CreateRegistryDtoPipe } from '../../pipes';
import { RegistriesService } from '../../services';

@Controller('/registries')
@ApiTags('registry')
export class RegistriesController {
  constructor(private readonly registriesService: RegistriesService) {}

  @Get()
  getAll() {
    return this.registriesService.findAll();
  }

  @Get('/:id')
  getOneById(@Param('id') id: number) {
    return this.registriesService.findOneById(id);
  }

  @Post()
  create(@Body(new CreateRegistryDtoPipe()) createRegistryDto: CreateRegistryDto) {
    return this.registriesService.create(createRegistryDto);
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() updateRegistryDto: UpdateRegistryDto) {
    return this.registriesService.update(id, updateRegistryDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return this.registriesService.remove(id);
  }
}
