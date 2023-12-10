import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';

import { join } from 'path';

import { DockerModule, EnvironmentModule } from './modules';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: '/data/containerized.db',
      autoLoadEntities: true,
      synchronize: true,
    }),

    RouterModule.register([
      { path: 'docker/:environmentId', module: DockerModule }
    ]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend', 'browser'),
    }),
    DockerModule,
    EnvironmentModule
  ],
})
export class AppModule {}
