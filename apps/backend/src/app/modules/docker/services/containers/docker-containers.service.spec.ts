import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import type { ContainerInfo } from 'dockerode';

import type { DockerContainerDto, DockerContainerDtos } from '@containerized/shared';

import { DockerService } from '../docker/docker.service';

import { DockerContainersService } from './docker-containers.service';

describe('DockerContainersService', () => {
  let dockerContainersService: DockerContainersService;
  let dockerService: DockerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DockerContainersService,
        {
          provide: DockerService, useValue: {
            listContainers: jest.fn()
          }
        }
      ],
    }).compile();

    dockerContainersService = moduleRef.get(DockerContainersService);
    dockerService = moduleRef.get(DockerService);
  });

  describe('findAll', () => {
    it('should return all containers', () => {
      const containerInfos: ContainerInfo[] = [{
        Id: '6b1c2d2da8da8ca81a45a445bb2166b2bc50df6c723178bfb167557923fb51d8',
        Names: ['/nginx'],
        Image: 'nginx',
        ImageID: 'ha256:a6bd71f48f6839d9faae1f29d3babef831e76bc213107682c5cc80f0cbb30866',
        Command: `/docker-entrypoint.sh nginx -g 'daemon off;'`,
        Created: 1577836800,
        Ports: [],
        Labels: {},
        State: 'exited',
        Status: 'Exited (0) 1 hours ago',
        HostConfig: { NetworkMode: 'host' },
        NetworkSettings: { Networks: {} },
        Mounts: [],
      }];

      const containerDtos: DockerContainerDtos = [{
        id: '6b1c2d2da8da8ca81a45a445bb2166b2bc50df6c723178bfb167557923fb51d8',
        names: ['nginx'],
        image: 'nginx',
        created: new Date('2020-01-01T00:00:00Z'),
        ports: [],
        status: 'exited'
      }]

      const listContainersSpy = jest.spyOn(dockerService, 'listContainers').mockReturnValue(Promise.resolve(containerInfos));
      expect(dockerContainersService.findAll()).resolves.toEqual(containerDtos);
      expect(listContainersSpy).toHaveBeenCalledWith({ all: true });
    });
  });

  describe('findOneById', () => {
    it('should return one containers', () => {
      const containerInfos: ContainerInfo[] = [{
        Id: '6b1c2d2da8da8ca81a45a445bb2166b2bc50df6c723178bfb167557923fb51d8',
        Names: ['/nginx'],
        Image: 'nginx',
        ImageID: 'ha256:a6bd71f48f6839d9faae1f29d3babef831e76bc213107682c5cc80f0cbb30866',
        Command: `/docker-entrypoint.sh nginx -g 'daemon off;'`,
        Created: 1577836800,
        Ports: [],
        Labels: {},
        State: 'exited',
        Status: 'Exited (0) 1 hours ago',
        HostConfig: {
          NetworkMode: 'host'
        },
        NetworkSettings: {
          Networks: {}
        },
        Mounts: [],
      }];

      const containerDto: DockerContainerDto = {
        id: '6b1c2d2da8da8ca81a45a445bb2166b2bc50df6c723178bfb167557923fb51d8',
        names: ['nginx'],
        image: 'nginx',
        created: new Date('2020-01-01T00:00:00Z'),
        ports: [],
        status: 'exited'
      };

      const listContainersSpy = jest.spyOn(dockerService, 'listContainers').mockReturnValue(Promise.resolve(containerInfos));
      expect(dockerContainersService.findOneById('6b1c2d2da8da8ca81a45a445bb2166b2bc50df6c723178bfb167557923fb51d8')).resolves.toEqual(containerDto);
      expect(listContainersSpy).toHaveBeenCalledWith({ all: true, filters: { id: ['6b1c2d2da8da8ca81a45a445bb2166b2bc50df6c723178bfb167557923fb51d8'] } })
    });

    it('should throw a NotFoundException if container is not found', () => {
      const listContainersSpy = jest.spyOn(dockerService, 'listContainers').mockReturnValue(Promise.reject(new NotFoundException()));
      expect(dockerContainersService.findOneById('6b1c2d2da8da8ca81a45a445bb2166b2bc50df6c723178bfb167557923fb51d8')).rejects.toThrow(NotFoundException);
      expect(listContainersSpy).toHaveBeenCalledWith({ all: true, filters: { id: ['6b1c2d2da8da8ca81a45a445bb2166b2bc50df6c723178bfb167557923fb51d8'] } })
    });
  });
});
