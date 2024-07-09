import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import type { DockerImageDtos } from '@containerized/shared';

import { DockerImagesService } from '../../services';

import { DockerImagesController } from './docker-images.controller';

describe('DockerImagesController', () => {
  let dockerImagesController: DockerImagesController;
  let dockerImagesService: DockerImagesService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DockerImagesController],
      providers: [
        {
          provide: DockerImagesService,
          useValue: {
            findAll: jest.fn(),
            pull: jest.fn(),
            pruneImages: jest.fn(),
          },
        },
      ],
    }).compile();

    dockerImagesController = moduleRef.get(DockerImagesController);
    dockerImagesService = moduleRef.get(DockerImagesService);
  });

  describe('getAll', () => {
    it('should return images', () => {
      const dockerImageDtos: DockerImageDtos = [
        {
          id: 'sha256:a6bd71f48f6839d9faae1f29d3babef831e76bc213107682c5cc80f0cbb30866',
          labels: { maintainer: 'NGINX Docker Maintainers <docker-maint@nginx.com>' },
          tags: ['nginx:latest'],
          used: false,
        },
      ];

      const findAllSpy = jest.spyOn(dockerImagesService, 'findAll').mockReturnValue(Promise.resolve(dockerImageDtos));
      expect(dockerImagesController.getAll()).resolves.toEqual(dockerImageDtos);
      expect(findAllSpy).toHaveBeenCalledWith();
    });
  });

  describe('pull', () => {
    it('should pull images', () => {
      const pullSpy = jest.spyOn(dockerImagesService, 'pull').mockReturnValue(Promise.resolve());
      expect(dockerImagesController.pull({ image: 'nginx', tag: 'latest' })).resolves.toEqual({ success: true });
      expect(pullSpy).toHaveBeenCalledWith({ image: 'nginx', tag: 'latest' });
    });

    it('should throw NotFoundException when image is not found', () => {
      const pullSpy = jest.spyOn(dockerImagesService, 'pull').mockReturnValue(Promise.reject({ statusCode: 404, json: null }));
      expect(dockerImagesController.pull({ image: 'not_existing_image', tag: 'latest' })).rejects.toThrow(NotFoundException);
      expect(pullSpy).toHaveBeenCalledWith({ image: 'not_existing_image', tag: 'latest' });
    });
  });

  describe('prune', () => {
    it('should prune images', () => {
      const pruneImagesSpy = jest.spyOn(dockerImagesService, 'pruneImages').mockReturnValue(Promise.resolve({ ImagesDeleted: null, SpaceReclaimed: 0 }));
      expect(dockerImagesController.prune()).resolves.toEqual({ ImagesDeleted: null, SpaceReclaimed: 0 });
      expect(pruneImagesSpy).toHaveBeenCalledWith();
    });
  });
});
