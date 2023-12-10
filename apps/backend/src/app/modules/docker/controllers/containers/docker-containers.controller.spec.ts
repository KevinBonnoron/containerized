import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { DockerContainerDto, DockerContainerDtos } from '@containerized/shared';

import { DockerContainersService } from '../../services';

import { DockerContainersController } from './docker-containers.controller';

describe('DockerContainersController', () => {
  let dockerContainersController: DockerContainersController;
  let dockerContainersService: DockerContainersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DockerContainersController],
      providers: [
        {
          provide: DockerContainersService, useValue: {
            findAll: jest.fn(),
            findOneById: jest.fn(),
            create: jest.fn(),
            prune: jest.fn(),
            delete: jest.fn(),
          }
        }
      ],
    }).compile();

    dockerContainersController = moduleRef.get(DockerContainersController);
    dockerContainersService = moduleRef.get(DockerContainersService);
  });

  describe('getAll', () => {
    it('should return containers', () => {
      const dockerContainerDtos: DockerContainerDtos = [{
        id: "6430fee20465e46677cbb0f0e18281d4c175e3966b40c940606cd0a54ca93fee",
        names: ["dazzling_villani"],
        image: "nginx",
        created: new Date("2023-12-09T13:50:11.000Z"),
        status: "created",
        ports: []
      }];

      const findAllSpy = jest.spyOn(dockerContainersService, 'findAll').mockReturnValue(Promise.resolve(dockerContainerDtos));
      expect(dockerContainersController.getAll()).resolves.toEqual(dockerContainerDtos);
      expect(findAllSpy).toHaveBeenCalledWith();
    });
  });

  describe('getOneById', () => {
    it('should return a container', () => {
      const dockerContainerDto: DockerContainerDto = {
        id: "6430fee20465e46677cbb0f0e18281d4c175e3966b40c940606cd0a54ca93fee",
        names: ["dazzling_villani"],
        image: "nginx",
        created: new Date("2023-12-09T13:50:11.000Z"),
        status: "created",
        ports: []
      };

      const findOneById = jest.spyOn(dockerContainersService, 'findOneById').mockReturnValue(Promise.resolve(dockerContainerDto));
      expect(dockerContainersController.getOneById('6430fee20465e46677cbb0f0e18281d4c175e3966b40c940606cd0a54ca93fee')).resolves.toEqual(dockerContainerDto);
      expect(findOneById).toHaveBeenCalledWith('6430fee20465e46677cbb0f0e18281d4c175e3966b40c940606cd0a54ca93fee');
    });

    it('should throw a NotFoundException when container is not found', async () => {
      const findOneById = jest.spyOn(dockerContainersService, 'findOneById').mockReturnValue(Promise.reject(new NotFoundException()));
      expect(dockerContainersController.getOneById('6430fee20465e46677cbb0f0e18281d4c175e3966b40c940606cd0a54ca93fee')).rejects.toThrow(NotFoundException);
      expect(findOneById).toHaveBeenCalledWith('6430fee20465e46677cbb0f0e18281d4c175e3966b40c940606cd0a54ca93fee');
    });
  });

  describe('create', () => {
    it('should create a container', () => {
      const dockerContainerDto: DockerContainerDto = {
        id: "6430fee20465e46677cbb0f0e18281d4c175e3966b40c940606cd0a54ca93fee",
        names: ["dazzling_villani"],
        image: "nginx",
        created: new Date("2023-12-09T13:50:11.000Z"),
        status: "created",
        ports: []
      };

      const createSpy = jest.spyOn(dockerContainersService, 'create').mockReturnValue(Promise.resolve(dockerContainerDto));
      expect(dockerContainersController.create({ image: 'nginx' })).resolves.toEqual(dockerContainerDto);
      expect(createSpy).toHaveBeenCalledWith({ image: 'nginx' });
    });
  });

  describe('delete', () => {
    it('should delete a container', () => {
      const dockerContainerDto: DockerContainerDto = {
        id: "6430fee20465e46677cbb0f0e18281d4c175e3966b40c940606cd0a54ca93fee",
        names: ["dazzling_villani"],
        image: "nginx",
        created: new Date("2023-12-09T13:50:11.000Z"),
        status: "created",
        ports: []
      };

      const deleteSpy = jest.spyOn(dockerContainersService, 'delete').mockReturnValue(Promise.resolve(dockerContainerDto));
      expect(dockerContainersController.delete('6430fee20465e46677cbb0f0e18281d4c175e3966b40c940606cd0a54ca93fee')).resolves.toEqual(dockerContainerDto);
      expect(deleteSpy).toHaveBeenCalledWith('6430fee20465e46677cbb0f0e18281d4c175e3966b40c940606cd0a54ca93fee')
    });

    it('should throw a NotFoundException if container is not found', async () => {
      const deleteSpy = jest.spyOn(dockerContainersService, 'delete').mockReturnValue(Promise.reject(new NotFoundException()));
      expect(dockerContainersController.delete('6430fee20465e46677cbb0f0e18281d4c175e3966b40c940606cd0a54ca93fee')).rejects.toThrow(NotFoundException);
      expect(deleteSpy).toHaveBeenCalledWith('6430fee20465e46677cbb0f0e18281d4c175e3966b40c940606cd0a54ca93fee');
    });
  });

  describe('prune', () => {
    it('should prune containers', () => {
      const response = { ContainersDeleted: null, SpaceReclaimed: 0 };
      const pruneSpy = jest.spyOn(dockerContainersService, 'prune').mockReturnValue(Promise.resolve(response));
      expect(dockerContainersController.prune()).resolves.toEqual(response);
      expect(pruneSpy).toHaveBeenCalledWith();
    });
  });
});
