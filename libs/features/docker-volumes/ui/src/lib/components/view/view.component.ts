import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { DockerVolumesStore } from '@containerized/features/docker-volumes/data-access';
import { NgxDataLayoutWrapperComponent } from '@containerized/ui';
import { NgxDataLayoutComponent, provideDataLayout } from 'ngx-data-layout';
import { DockerVolumesViewCardsComponent } from './cards/cards.component';
import { DockerVolumesViewTableComponent } from './table/table.component';

@Component({
  selector: 'containerized-docker-volumes-view',
  standalone: true,
  imports: [NgxDataLayoutComponent, RouterOutlet],
  templateUrl: './view.component.html',
  providers: [
    provideDataLayout({
      wrapper: NgxDataLayoutWrapperComponent,
      components: [
        { component: DockerVolumesViewCardsComponent, name: 'cards' },
        { component: DockerVolumesViewTableComponent, name: 'table' },
      ],
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerVolumesViewComponent {
  private readonly dockerVolumesStore = inject(DockerVolumesStore);

  readonly dockerVolumes = this.dockerVolumesStore.entities;
}
