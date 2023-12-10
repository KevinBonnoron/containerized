import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

import { DockerImagesEntity, DockerImagesFacade } from '@containerized/features/docker-images/data-access';
import { Columns, GridTableViewComponent } from '@containerized/ui';

@Component({
  standalone: true,
  imports: [GridTableViewComponent, MatCardModule, MatChipsModule],
  selector: 'containerized-docker-image-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerImageListComponent {
  private readonly dockerImagesFacade = inject(DockerImagesFacade);

  readonly dockerImages = this.dockerImagesFacade.allDockerImages;
  readonly columns: Columns<DockerImagesEntity> = [
    { id: 'id', title: 'Id' },
    { id: 'tags', title: 'Tags' },
  ]
}
