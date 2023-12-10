import { ImageInfo } from 'dockerode';

import { DockerImageDto } from '@containerized/shared';

export const DockerImagesAdapter = {
  toDto(imageInfo: ImageInfo): DockerImageDto {
    return {
      id: imageInfo.Id,
      labels: imageInfo.Labels ?? {},
      tags: imageInfo.RepoTags,
    }
  }
}