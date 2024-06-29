import type { DockerVolumeDto } from '@containerized/shared';

import type { VolumeInspectInfo } from '../types';

export const DockerVolumesAdapter = {
  toDto(volumeInfo: VolumeInspectInfo): DockerVolumeDto {
    return {
      name: volumeInfo.Name,
      labels: volumeInfo.Labels,
      driver: volumeInfo.Driver,
      mountPoint: volumeInfo.Mountpoint,
      scope: volumeInfo.Scope,
    };
  }
}