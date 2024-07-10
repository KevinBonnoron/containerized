import { Directive, inject } from '@angular/core';
import { DockerImagesStore } from '@containerized/features/docker-images/data-access';
import { DockerImageDto } from '@containerized/shared';
import { entriesOf } from 'monadojs';
import { DataLayoutComponent } from 'ngx-data-layout';

@Directive({
  standalone: true,
})
export abstract class AbstractUiDirective extends DataLayoutComponent<DockerImageDto> {
  private readonly dockerImagesStore = inject(DockerImagesStore);

  pullImage(dockerImage: DockerImageDto) {
    this.dockerImagesStore.pull(dockerImage.tags[0]);
  }

  imageLabels(dockerImage: DockerImageDto) {
    return [...entriesOf(dockerImage.labels)].map(([key, value]) => `${key}=${value}`);
  }

  removeImage(dockerImage: DockerImageDto) {
    this.dockerImagesStore.remove(dockerImage);
  }
}
