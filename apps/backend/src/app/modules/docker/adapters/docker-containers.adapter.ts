import type { ContainerInspectInfo, Port } from 'dockerode';

import type { DockerContainerDto, DockerContainerEnvironment, DockerContainerPort, DockerContainerStatus, DockerContainerVolume } from '@containerized/shared';
import { Mount } from '../types';

const portBindingsToPort = (portBindings: Record<string, { HostIp: string, HostPort: string }[]>): Port[] => {
  return Object.entries(portBindings).map(([key, [value]]) => {
    const [PrivatePort, Type] = key.split('/');

    return {
      PublicPort: parseInt(value.HostPort),
      PrivatePort: parseInt(PrivatePort),
      Type,
      IP: value.HostIp
    };
  });
};

const DockerContainersPortAdapter = {
  toDto(port: Port): DockerContainerPort {
    return {
      host: port.PublicPort,
      container: port.PrivatePort,
      protocol: port.Type,
      ip: port.IP,
    }
  }
};

const DockerContainersVolumeAdapter = {
  toDto(mount: Mount): DockerContainerVolume {
    const baseVolume = {
      destination: mount.Destination,
      mode: mount.Mode,
      propgation: mount.Propagation,
      rw: mount.RW,
      driver: mount.Driver,
    } as const;

    switch (mount.Type) {
      case 'volume':
        return {
          ...baseVolume,
          type: 'named',
          name: mount.Name,
        };

      case 'bind':
        return {
          ...baseVolume,
          type: 'bind',
          source: mount.Source,
        };
    }
  }
};

const DockerContainersEnvironmentAdapter = {
  toDto(environment: string): DockerContainerEnvironment {
    const [key, value] = environment.split('=', 2);
    return {
      key,
      value
    };
  }
};

export const DockerContainersAdapter = {
  toDto(containerInspectInfo: ContainerInspectInfo): DockerContainerDto {
    return {
      id: containerInspectInfo.Id,
      name: containerInspectInfo.Name.substring(1),
      image: containerInspectInfo.Config.Image,
      created: new Date(containerInspectInfo.Created),
      status: containerInspectInfo.State.Status as DockerContainerStatus,
      labels: Object.entries(containerInspectInfo.Config.Labels).map(([key, value]) => ({ key, value })),
      ports: portBindingsToPort(containerInspectInfo.HostConfig.PortBindings ?? {}).map(DockerContainersPortAdapter.toDto),
      volumes: containerInspectInfo.Mounts.map(DockerContainersVolumeAdapter.toDto),
      environments: containerInspectInfo.Config.Env.map(DockerContainersEnvironmentAdapter.toDto)
    }
  }
};
