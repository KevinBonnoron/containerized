import { Test } from '@nestjs/testing';
import type { ImageInfo } from 'dockerode';

import type { DockerImageDtos } from '@containerized/shared';

import { DockerService } from '../docker/docker.service';

import { DockerImagesService } from './docker-images.service';

describe('DockerImagesService', () => {
  let dockerImagesService: DockerImagesService;
  let dockerService: DockerService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DockerImagesService,
        {
          provide: DockerService, useValue: {
            listImages: jest.fn()
          }
        }
      ],
    }).compile();

    dockerImagesService = moduleRef.get(DockerImagesService);
    dockerService = moduleRef.get(DockerService);
  });

  describe('findAll', () => {
    it('should return all containers', () => {
      const imageInfos: ImageInfo[] = [{
        Containers: -1,
        Created: 1700557532,
        Id: 'sha256:a6bd71f48f6839d9faae1f29d3babef831e76bc213107682c5cc80f0cbb30866',
        Labels: { maintainer: 'NGINX Docker Maintainers <docker-maint@nginx.com>' },
        ParentId: '',
        RepoDigests: ['nginx@sha256:10d1f5b58f74683ad34eb29287e07dab1e90f10af243f151bb50aa5dbb4d62ee'],
        RepoTags: ['nginx:latest'],
        SharedSize: -1,
        Size: 186779305,
        VirtualSize: 186779305
      }];

      const dockerImageDtos: DockerImageDtos = [{
        id: 'sha256:a6bd71f48f6839d9faae1f29d3babef831e76bc213107682c5cc80f0cbb30866',
        labels: { maintainer: 'NGINX Docker Maintainers <docker-maint@nginx.com>' },
        tags: ['nginx:latest'],
        used: false,
      }];

      const listImagesSpy = jest.spyOn(dockerService, 'listImages').mockReturnValue(Promise.resolve(imageInfos));
      expect(dockerImagesService.findAll()).resolves.toEqual(dockerImageDtos);
      expect(listImagesSpy).toHaveBeenCalledWith();
    });
  });

  describe('findOneById', () => {

  });
});