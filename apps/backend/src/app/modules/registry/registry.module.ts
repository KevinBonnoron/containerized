import { Module } from '@nestjs/common';

import { PrismaService } from '@containerized/db';
import { RegistriesController } from './controllers';
import { RegistriesService } from './services';

@Module({
  controllers: [RegistriesController],
  providers: [PrismaService, RegistriesService],
  exports: [RegistriesService],
})
export class RegistryModule {}
