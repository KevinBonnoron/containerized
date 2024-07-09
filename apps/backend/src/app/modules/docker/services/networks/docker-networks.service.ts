import { Injectable } from '@nestjs/common';
import { DockerNetworksAdapter } from '../../adapters';
import { CreateNetworkDto } from '../../dtos';
import { DockerService } from '../docker/docker.service';

@Injectable()
export class DockerNetworksService {
  constructor(private readonly dockerService: DockerService) {}

  async findAll() {
    return (await this.dockerService.listNetworks()).map(DockerNetworksAdapter.toDto);
  }

  async findOneById(id: string) {
    const networkInspectInfo = await this.inspect(id);
    return DockerNetworksAdapter.toDto(networkInspectInfo);
  }

  async create({ name, scope, driver }: CreateNetworkDto) {
    const network = await this.dockerService.createNetwork({ Name: name, Driver: driver });
    return this.findOneById(network.id);
  }

  remove(id: string) {
    return this.dockerService.deleteNetwork(id);
  }

  inspect(id: string) {
    const network = this.dockerService.getNetwork(id);
    return network.inspect();
  }
}
