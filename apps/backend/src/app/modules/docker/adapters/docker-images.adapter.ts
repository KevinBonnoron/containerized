import type { ImageInfo } from 'dockerode';

import type { DockerImageDto } from '@containerized/shared';

export const DockerImagesAdapter = {
  toDto(imageInfo: ImageInfo): DockerImageDto {
    return {
      id: imageInfo.Id,
      labels: imageInfo.Labels ?? {},
      tags: imageInfo.RepoTags,
      used: imageInfo.Containers !== -1,
    };
  },
};
