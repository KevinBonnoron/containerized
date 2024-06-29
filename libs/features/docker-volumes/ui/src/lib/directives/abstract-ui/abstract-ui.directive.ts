import { Directive, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DockerVolumesStore } from '@containerized/features/docker-volumes/data-access';
import { DockerVolumeDto } from '@containerized/shared';
import { DataLayoutComponent } from 'ngx-data-layout';

@Directive({
  standalone: true
})
export abstract class AbstractUiDirective extends DataLayoutComponent<DockerVolumeDto> {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly dockerVolumesStore = inject(DockerVolumesStore);

  editVolume(dockerVolume: DockerVolumeDto) {
    this.router.navigate(['../edit', dockerVolume.name], { relativeTo: this.activatedRoute });
  }

  removeVolume(dockerVolume: DockerVolumeDto) {
    this.dockerVolumesStore.remove(dockerVolume);
  }
}
