import { DockerNetworkDto } from '@containerized/shared';
import { NetworkInspectInfo } from 'dockerode';

const DOCKER_NETWORK_SYSTEM_NAMES = ['none', 'host', 'bridge'];

export const DockerNetworksAdapter = {
  toDto(networkInspectInfo: NetworkInspectInfo): DockerNetworkDto {
    return {
      id: networkInspectInfo.Id,
      name: networkInspectInfo.Name,
      scope: networkInspectInfo.Scope,
      driver: networkInspectInfo.Driver,
      enableIPv6: networkInspectInfo.EnableIPv6,
      system: DOCKER_NETWORK_SYSTEM_NAMES.includes(networkInspectInfo.Name),
    };
  }
}
