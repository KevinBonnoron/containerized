import { Injectable, NotFoundException } from '@nestjs/common';

import { DockerContainerBindVolume } from '@containerized/shared';
import { DockerContainersAdapter } from '../../adapters';
import type { CreateContainerDto, GetContainerQueryDto, RenameContainerDto, RunContainerDto } from '../../dtos';
import { ContainerAlreadyStoppedException } from '../../exceptions';
import { DockerService } from '../docker/docker.service';

@Injectable()
export class DockerContainersService {
  constructor(private readonly dockerService: DockerService) {}

  async findAll(query?: GetContainerQueryDto) {
    const containerInfos = await this.dockerService.listContainers({ all: true, filters: query });
    return containerInfos.map(DockerContainersAdapter.toDto);
  }

  async findOneById(id: string) {
    const [containerInspectInfo] = await this.dockerService.listContainers({ all: true, filters: { id: [id] } });
    if (containerInspectInfo === undefined) {
      throw new NotFoundException();
    }

    return DockerContainersAdapter.toDto(containerInspectInfo);
  }

  async create({ image, name }: CreateContainerDto) {
    const container = await this.dockerService.createContainer({ Image: image, name });
    return this.findOneById(container.id);
  }

  async remove(id: string) {
    const container = this.dockerService.getContainer(id);
    if (container === undefined) {
      throw new NotFoundException();
    }

    await container.remove({ force: true });
  }

  logs(id: string) {
    return this.dockerService.logContainer(id);
  }

  inspect(id: string) {
    return this.dockerService.inspectContainer(id);
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
    try {
      await container.stop();
      return { success: true };
    } catch (error) {
      throw new ContainerAlreadyStoppedException(error.reason);
    }
  }

  rename(id: string, { name }: RenameContainerDto) {
    return this.dockerService.renameContainer(id, name);
  }

  async run({ image, volumes, ports = [], ...rest }: RunContainerDto) {
    const Volumes = volumes?.reduce((accumulator, volume) => ({ ...accumulator, [volume.destination]: {} }), {}) ?? [];
    const Binds = volumes?.filter((volume) => volume.type === 'bind').map((volume: DockerContainerBindVolume) => `${volume.source}:${volume.destination}:${volume.rw ? 'rw' : 'ro'}`);
    const ExposedPorts = ports?.reduce((accumulator, port) => ({ ...accumulator, [`${port.container}/${port.protocol}`]: {} }), {}) ?? {};
    const PortBindings = ports?.reduce((accumulator, port) => ({ ...accumulator, [`${port.container}/${port.protocol}`]: [{ ...(port.ip && { HostIp: `${port.ip}` }), ...(port.host && { HostPort: `${port.host}` }) }] }), {}) ?? {};

    const container = await this.dockerService.runContainer(image, {
      ...rest,
      Volumes,
      ExposedPorts,
      HostConfig: {
        Binds,
        PortBindings,
      },
    });
    return this.findOneById(container.id);
  }
}
