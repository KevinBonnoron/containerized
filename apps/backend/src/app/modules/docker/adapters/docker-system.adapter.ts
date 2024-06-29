import { DockerInfoDto } from '@containerized/shared';
import { SystemInfo } from '../types';

export const DockerSystemAdapter = {
  toDto(systemInfo: SystemInfo): DockerInfoDto {
    return {
      containers: {
        total: systemInfo.Containers,
        running: systemInfo.ContainersRunning,
        paused: systemInfo.ContainersPaused,
        stopped: systemInfo.ContainersStopped,
      },
      images: systemInfo.Images,
      driver: systemInfo.Driver,
    };
  }
}
