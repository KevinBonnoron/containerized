import { Controller, Get } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { DockerSystemService } from '../../services';

@Controller('system')
@ApiTags('docker system')
export class DockerSystemController {
  constructor(private readonly dockerSystemService: DockerSystemService) {}

  @Get('/info')
  info() {
    return this.dockerSystemService.getInfo();
  }

  @Get('/version')
  version() {
    return this.dockerSystemService.getVersion();
  }

  @Get('/ping')
  ping() {
    return this.dockerSystemService.getPing();
  }
}
