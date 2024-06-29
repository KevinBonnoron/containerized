import { Injectable } from '@nestjs/common';

import { DockerVolumesAdapter } from '../../adapters';
import type { CreateVolumeDto } from '../../dtos';
import type { VolumeInspectInfo } from '../../types';
import { DockerService } from '../docker/docker.service';

@Injectable()
export class DockerVolumesService {
  constructor(
    private readonly dockerService: DockerService
  ) {}

  async findAll() {
    const { Volumes: volumeInfos } = await this.dockerService.listVolumes({ all: true });
    return volumeInfos.map(DockerVolumesAdapter.toDto);
  }

  async findOneByName(name: string) {
    const volumeInspectInfo = await this.inspect(name);
    return DockerVolumesAdapter.toDto(volumeInspectInfo);
  }

  async create({ name, driver, labels }: CreateVolumeDto) {
    const volume = await this.dockerService.createVolume({ Name: name, Driver: driver, Labels: labels });
    const volumeInspectInfo = await volume.inspect() as VolumeInspectInfo;
    return DockerVolumesAdapter.toDto(volumeInspectInfo);
  }

  remove(name: string) {
    const volume = this.dockerService.getVolume(name);
    return volume.remove();
  }

  prune() {
    return this.dockerService.pruneVolumes();
  }

  inspect(name: string) {
    const volume = this.dockerService.getVolume(name);
    return volume.inspect() as Promise<VolumeInspectInfo>;
  }
}
