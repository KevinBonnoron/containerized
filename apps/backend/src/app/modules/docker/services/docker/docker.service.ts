import { Inject, Injectable } from '@nestjs/common';
import Docker, { Container, ContainerCreateOptions, ListImagesOptions, Volume, VolumeCreateOptions } from 'dockerode';

import { DOCKER } from '../../tokens/dockerode.token';
import { ListContainersOptions, ListVolumesOptions, PruneContainersOptions, PruneImagesOptions, PullImageOptions, RunContainerOptions, VolumeInspectInfo } from '../../types';
import { followProgress } from '../../utils';

@Injectable()
export class DockerService {
  constructor(
    @Inject(DOCKER) private readonly docker: Docker,
  ) {}

  listImages(options?: ListImagesOptions) {
    return this.docker.listImages({ ...options, ...(options?.filters && { filters: JSON.stringify(options.filters) }) });
  }

  async pull(repoTag: string, options?: PullImageOptions) {
    const stream = await this.docker.pull(repoTag, options);
    return followProgress(this.docker, stream);
  }

  pruneImages(options?: PruneImagesOptions) {
    return this.docker.pruneImages(options);
  }

  listContainers(options?: ListContainersOptions) {
    return this.docker.listContainers(options);
  }

  getContainer(id: string) {
    return this.docker.getContainer(id);
  }

  run(image: string, { name }: RunContainerOptions = {}) {
    const cmd: string[] = [];

    return new Promise<Container>((resolve, reject) => {
      const eventEmitter = this.docker.run(image, cmd, null, { Tty: false, name }, (error) => {
        if (error) {
          reject(error);
        }
      });

      // container | stream | data
      eventEmitter.on('container', (container) => resolve(container));
    })
  }

  createContainer(options: ContainerCreateOptions) {
    return this.docker.createContainer(options);
  }

  pruneContainers(options?: PruneContainersOptions) {
    return this.docker.pruneContainers(options);
  }

  listVolumes(options?: ListVolumesOptions) {
    return this.docker.listVolumes(options) as Promise<{ Volumes: VolumeInspectInfo[], Warnings: string[] | null }>;
  }

  getVolume(name: string) {
    return this.docker.getVolume(name);
  }

  async createVolume(options?: VolumeCreateOptions) {
    // TODO this a bug from the type definitions, the return should be Volume. 
    const volume = await this.docker.createVolume(options) as unknown as Volume;
    return this.getVolume(volume.name);
  }

  pruneVolumes() {
    return this.docker.pruneVolumes();
  }
}
