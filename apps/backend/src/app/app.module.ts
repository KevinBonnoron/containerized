import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';

import { join } from 'path';

import { DockerModule, EnvironmentModule, RegistryModule } from './modules';

@Module({
  imports: [
    RouterModule.register([{ path: 'docker/:environmentId', module: DockerModule }]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend', 'browser'),
      exclude: ['/api/(.*)'],
    }),
    DockerModule,
    EnvironmentModule,
    RegistryModule,
  ],
})
export class AppModule {}
