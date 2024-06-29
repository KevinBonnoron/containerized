import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateNetworkDto } from '../../dtos';
import { DockerNetworksService } from '../../services';

@Controller('/networks')
@ApiTags('docker networks')
export class DockerNetworksController {
  constructor(
    private readonly dockerNetworksService: DockerNetworksService
  ) { }

  @Get()
  getAll() {
    return this.dockerNetworksService.findAll();
  }

  @Get('/:id')
  getOneByName(@Param('id') id: string) {
    return this.dockerNetworksService.findOneById(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'The network has been successfully created' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  create(@Body() createNetworkDto: CreateNetworkDto) {
    return this.dockerNetworksService.create(createNetworkDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.dockerNetworksService.remove(id);
  }
}