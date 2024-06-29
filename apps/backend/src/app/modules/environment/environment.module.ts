import { Module } from '@nestjs/common';

import { PrismaService } from '../../../../../../libs/db/src/lib/services';
import { EnvironmentsController } from './controllers/environments/environments.controller';
import { EnvironmentsService } from './services';

@Module({
  controllers: [EnvironmentsController],
  providers: [PrismaService, EnvironmentsService],
  exports: [EnvironmentsService]
})
export class EnvironmentModule {}
