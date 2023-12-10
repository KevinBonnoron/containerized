import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EnvironmentsController } from './controllers/environments/environments.controller';
import { EnvironmentEntity } from './entities';
import { EnvironmentsService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([EnvironmentEntity]),
  ],
  controllers: [EnvironmentsController],
  providers: [EnvironmentsService],
  exports: [EnvironmentsService]
})
export class EnvironmentModule {}
