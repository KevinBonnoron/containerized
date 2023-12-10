import { Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import Docker, { DockerOptions } from 'dockerode';
import { Request } from 'express';

import { stringMatcher } from '@containerized/shared';

import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentsService } from '../environment/services';

import { DockerEventsAdapter } from './adapters';
import { DockerContainersController, DockerImagesController, DockerVolumesController } from './controllers';
import { DockerGateway } from './gateways';
import { DockerContainersService, DockerImagesService, DockerService, DockerVolumesService } from './services';
import { DOCKER } from './tokens/dockerode.token';

const dockers: Record<string, Docker> = {};

@Module({
  imports: [EnvironmentModule],
  controllers: [DockerContainersController, DockerImagesController, DockerVolumesController],
  providers: [
    DockerService,
    DockerImagesService,
    DockerContainersService,
    DockerVolumesService,
    DockerGateway,
    {
      provide: DOCKER,
      scope: Scope.REQUEST,
      useFactory: async (request: Request, environmentsService: EnvironmentsService, dockerGateway: DockerGateway) => {
        const { environmentId } = request.params;
        let docker = dockers[environmentId];
        if (docker === undefined) {
          const environment = await environmentsService.findOneById(parseInt(environmentId));
          let dockerOptions: DockerOptions = {};
          if (environment.url) {
            dockerOptions = stringMatcher()
              .match(/((?:https:\/\/|http:\/\/|tcp:\/\/|)[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}(?::[0-9]+)?)/, ([host, port]) => ({ host, port: parseInt(port) }))
              .match(/unix:(.*)/, ([socketPath]) => ({ socketPath }))
              .query(environment.url);
          }

          docker = new Docker(dockerOptions);
          docker.getEvents({}, (error, result) => {
            if (error) {
              throw error;
            }

            result.on('data', (chunk) => dockerGateway.onEvent(DockerEventsAdapter.toDto(JSON.parse(chunk.toString('utf8')))));
          });

          dockers[environmentId] = docker;
        }

        return docker;
      },
      inject: [REQUEST, EnvironmentsService, DockerGateway]
    }
  ]
})
export class DockerModule { }
