import { Test } from '@nestjs/testing';

import type { DockerVolumeDtos } from '@containerized/shared';

import type { VolumeInspectInfo } from '../../types';
import { DockerService } from '../docker/docker.service';

import { DockerVolumesService } from './docker-volumes.service';

describe('DockerVolumesService', () => {
  let dockerVolumesService: DockerVolumesService;
  let dockerService: DockerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DockerVolumesService,
        {
          provide: DockerService, useValue: {
            listVolumes: jest.fn()
          }
        }
      ],
    }).compile();

    dockerVolumesService = moduleRef.get(DockerVolumesService);
    dockerService = moduleRef.get(DockerService);
  });

  describe('findAll', () => {
    it('should return all containers', () => {
      // TODO there is a bug in the dockerode definition for VolumeInspectInfo
      const volumeInspectInfos: VolumeInspectInfo[] = [{
        CreatedAt: '2023-12-10T10:03:36Z',
        Driver: 'local',
        Labels: { 'com.docker.volume.anonymous': '' },
        Mountpoint: '/var/lib/docker/volumes/90166baccb5ffc95206738a61b1dabc8ffc68ab0ccab840fcb7c18a141626a97/_data',
        Name: '90166baccb5ffc95206738a61b1dabc8ffc68ab0ccab840fcb7c18a141626a97',
        Options: null,
        Scope: 'local'
      }];

      const dockerVolumeDtos: DockerVolumeDtos = [{
        name: '90166baccb5ffc95206738a61b1dabc8ffc68ab0ccab840fcb7c18a141626a97',
        labels: {
          'com.docker.volume.anonymous': ''
        },
        driver: 'local',
        mountPoint: '/var/lib/docker/volumes/90166baccb5ffc95206738a61b1dabc8ffc68ab0ccab840fcb7c18a141626a97/_data',
        scope: 'local'
      }];

      const listImagesSpy = jest.spyOn(dockerService, 'listVolumes').mockReturnValue(Promise.resolve({ Volumes: volumeInspectInfos, Warnings: null }));
      expect(dockerVolumesService.findAll()).resolves.toEqual(dockerVolumeDtos);
      expect(listImagesSpy).toHaveBeenCalledWith({ all: true });
    });
  });
});