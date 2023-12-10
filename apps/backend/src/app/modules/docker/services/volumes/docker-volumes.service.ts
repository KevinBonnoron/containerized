import { Injectable } from '@nestjs/common';

import { DockerVolumesAdapter } from '../../adapters';
import { CreateVolumeDto } from '../../dtos';
import { VolumeInspectInfo } from '../../types';
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
    const volume = this.dockerService.getVolume(name);
    const volumeInspectInfo = await volume.inspect() as VolumeInspectInfo;
    return DockerVolumesAdapter.toDto(volumeInspectInfo);
  }

  async create({ name, driver, labels }: CreateVolumeDto) {
    const volume = await this.dockerService.createVolume({ Name: name, Driver: driver, Labels: labels });
    const volumeInspectInfo = await volume.inspect() as VolumeInspectInfo;
    return DockerVolumesAdapter.toDto(volumeInspectInfo);
  }

  delete(name: string) {
    const volume = this.dockerService.getVolume(name);
    return volume.remove();
  }

  prune() {
    return this.dockerService.pruneVolumes();
  }
}
