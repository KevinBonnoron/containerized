import { ContainerInfo, Port } from 'dockerode';

import { DockerContainerDto, DockerContainerPort, DockerContainerStatus } from '@containerized/shared';

export const DockerContainersPortAdapter = {
  toDto(port: Port): DockerContainerPort {
    return {
      host: port.PublicPort ?? port.PrivatePort,
      container: port.PrivatePort,
      protocol: port.Type
    }
  }
}

export const DockerContainersAdapter = {
  toDto(containerInfo: ContainerInfo): DockerContainerDto {
    return {
      id: containerInfo.Id,
      names: containerInfo.Names.map((name) => name.substring(1)),
      image: containerInfo.Image,
      created: new Date(containerInfo.Created * 1000),
      status: containerInfo.State as DockerContainerStatus,
      ports: containerInfo.Ports.map(DockerContainersPortAdapter.toDto),
    }
  }
}