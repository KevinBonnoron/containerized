import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import type { DockerVolumeDto, DockerVolumeDtos } from '@containerized/shared';

import { DockerVolumesService } from '../../services';

import { DockerVolumesController } from './docker-volumes.controller';

describe('DockerVolumesController', () => {
  let dockerVolumesController: DockerVolumesController;
  let dockerVolumesService: DockerVolumesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DockerVolumesController],
      providers: [
        {
          provide: DockerVolumesService,
          useValue: {
            findAll: jest.fn(),
            findOneByName: jest.fn(),
            create: jest.fn(),
            prune: jest.fn(),
          },
        },
      ],
    }).compile();

    dockerVolumesController = moduleRef.get(DockerVolumesController);
    dockerVolumesService = moduleRef.get(DockerVolumesService);
  });

  describe('getAll', () => {
    it('should return volumes', () => {
      const dockerVolumesDtos: DockerVolumeDtos = [
        {
          name: '90166baccb5ffc95206738a61b1dabc8ffc68ab0ccab840fcb7c18a141626a97',
          labels: { 'com.docker.volume.anonymous': '' },
          driver: 'local',
          mountPoint: '/var/lib/docker/volumes/90166baccb5ffc95206738a61b1dabc8ffc68ab0ccab840fcb7c18a141626a97/_data',
          scope: 'local',
        },
      ];

      const findAllSpy = jest.spyOn(dockerVolumesService, 'findAll').mockReturnValue(Promise.resolve(dockerVolumesDtos));
      expect(dockerVolumesController.getAll()).resolves.toEqual(dockerVolumesDtos);
      expect(findAllSpy).toHaveBeenCalledWith();
    });
  });

  describe('getOneByName', () => {
    it('should return volume', () => {
      const dockerVolumesDto: DockerVolumeDto = {
        name: '90166baccb5ffc95206738a61b1dabc8ffc68ab0ccab840fcb7c18a141626a97',
        labels: { 'com.docker.volume.anonymous': '' },
        driver: 'local',
        mountPoint: '/var/lib/docker/volumes/90166baccb5ffc95206738a61b1dabc8ffc68ab0ccab840fcb7c18a141626a97/_data',
        scope: 'local',
      };

      const findOneByNameSpy = jest.spyOn(dockerVolumesService, 'findOneByName').mockReturnValue(Promise.resolve(dockerVolumesDto));
      expect(dockerVolumesController.getOneByName('90166baccb5ffc95206738a61b1dabc8ffc68ab0ccab840fcb7c18a141626a97')).resolves.toEqual(dockerVolumesDto);
      expect(findOneByNameSpy).toHaveBeenCalledWith('90166baccb5ffc95206738a61b1dabc8ffc68ab0ccab840fcb7c18a141626a97');
    });

    it('should throw a NotFoundException if volume is not found', async () => {
      const findOneByNameSpy = jest.spyOn(dockerVolumesService, 'findOneByName').mockReturnValue(Promise.reject(new NotFoundException()));
      expect(dockerVolumesController.getOneByName('90166baccb5ffc95206738a61b1dabc8ffc68ab0ccab840fcb7c18a141626a97')).rejects.toThrow(NotFoundException);
      expect(findOneByNameSpy).toHaveBeenCalledWith('90166baccb5ffc95206738a61b1dabc8ffc68ab0ccab840fcb7c18a141626a97');
    });
  });

  describe('create', () => {
    it('should create a volume', () => {
      const dockerVolumeDto: DockerVolumeDto = {
        name: '90166baccb5ffc95206738a61b1dabc8ffc68ab0ccab840fcb7c18a141626a97',
        labels: { 'com.docker.volume.anonymous': '' },
        driver: 'local',
        mountPoint: '/var/lib/docker/volumes/90166baccb5ffc95206738a61b1dabc8ffc68ab0ccab840fcb7c18a141626a97/_data',
        scope: 'local',
      };

      const createSpy = jest.spyOn(dockerVolumesService, 'create').mockReturnValue(Promise.resolve(dockerVolumeDto));
      expect(dockerVolumesController.create({})).resolves.toEqual(dockerVolumeDto);
      expect(createSpy).toHaveBeenCalledWith({});
    });
  });

  describe('prune', () => {
    it('should prune volumes', () => {
      const response = { VolumesDeleted: [], SpaceReclaimed: 0 };

      const createSpy = jest.spyOn(dockerVolumesService, 'prune').mockReturnValue(Promise.resolve(response));
      expect(dockerVolumesController.prune()).resolves.toEqual(response);
      expect(createSpy).toHaveBeenCalledWith();
    });
  });
});
