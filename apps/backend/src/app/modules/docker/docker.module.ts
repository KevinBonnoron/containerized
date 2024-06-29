import { Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';
import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentsService } from '../environment/services';
import { DockerContainersController, DockerEventsController, DockerImagesController, DockerNetworksController, DockerSystemController, DockerVolumesController } from './controllers';
import { DockerGateway } from './gateways';
import { DockerContainersService, DockerEventsService, DockerImagesService, DockerNetworksService, DockerService, DockerSystemService, DockerVolumesService } from './services';

const dockerServices: Record<string, DockerService> = {};

@Module({
  imports: [EnvironmentModule],
  controllers: [
    DockerSystemController,
    DockerContainersController,
    DockerImagesController,
    DockerVolumesController,
    DockerEventsController,
    DockerNetworksController,
  ],
  providers: [
    DockerService,
    DockerSystemService,
    DockerImagesService,
    DockerContainersService,
    DockerVolumesService,
    DockerEventsService,
    DockerNetworksService,
    DockerGateway,
    {
      provide: DockerService,
      scope: Scope.REQUEST,
      useFactory: async (request: Request, environmentsService: EnvironmentsService, dockerGateway: DockerGateway) => {
        const { environmentId } = request.params;
        let dockerService = dockerServices[environmentId];
        if (dockerService === undefined) {
          const environment = await environmentsService.findOneById(parseInt(environmentId));
          dockerService = DockerService.fromConfig(dockerGateway, environment.url);
          dockerServices[environmentId] = dockerService
        }

        return dockerService;
      },
      inject: [REQUEST, EnvironmentsService, DockerGateway]
    }
  ]
})
export class DockerModule { }
