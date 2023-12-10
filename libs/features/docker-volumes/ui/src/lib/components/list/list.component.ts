import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { DockerVolumesEntity, DockerVolumesFacade } from '@containerized/features/docker-volumes/data-access';
import { Columns, GridTableViewComponent } from '@containerized/ui';

@Component({
  standalone: true,
  imports: [GridTableViewComponent, MatCardModule],
  selector: 'containerized-docker-volume-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerVolumeListComponent {
  private readonly dockerVolumesFacade = inject(DockerVolumesFacade);

  readonly dockerVolumes = this.dockerVolumesFacade.allVolumes;
  readonly columns: Columns<DockerVolumesEntity> = [
    { id: 'name', title: 'Name' },
    { id: 'driver', title: 'Driver' },
    { id: 'mountPoint', title: 'Mount Point' },
  ]
}
