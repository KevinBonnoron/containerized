import { Injectable, NotFoundException } from '@nestjs/common';

import { DockerContainersAdapter } from '../../adapters';
import { CreateContainerDto, RunContainerDto } from '../../dtos';
import { DockerService } from '../docker/docker.service';

@Injectable()
export class DockerContainersService {
  constructor(
    private readonly dockerService: DockerService
  ) {}

  async findAll() {
    const containerInfos = await this.dockerService.listContainers({ all: true });
    return containerInfos.map(DockerContainersAdapter.toDto);
  }

  async findOneById(id: string) {
    const [container] = await this.dockerService.listContainers({ all: true, filters: { id: [id] } });
    if (container === undefined) {
      throw new NotFoundException();
    }

    return DockerContainersAdapter.toDto(container);
  }

  async create({ image, name }: CreateContainerDto) {
    const container = await this.dockerService.createContainer({ Image: image, name });
    return this.findOneById(container.id);
  }

  async delete(id: string) {
    const container = this.dockerService.getContainer(id)
    if (container === undefined) {
      throw new NotFoundException();
    }

    return await container.remove({ force: true });
  }

  prune() {
    return this.dockerService.pruneContainers();
  }

  async start(id: string) {
    const container = this.dockerService.getContainer(id);
    await container.start();
    return { success: true };
  }

  async stop(id: string) {
    const container = this.dockerService.getContainer(id);
    await container.stop();
    return { success: true };
  }

  async run({ image, tag, ...rest }: RunContainerDto) {
    const container = await this.dockerService.run(`${image}:${tag}`, rest);
    return this.findOneById(container.id);
  }
}