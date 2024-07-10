import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { DockerVolumesStore } from '@containerized/features/docker-volumes/data-access';
import { NgxDataLayoutComponent, provideDataLayout } from 'ngx-data-layout';
import { DockerVolumesViewCardsComponent } from './cards/cards.component';
import { DockerVolumesViewTableComponent } from './table/table.component';
import { DockerVolumesViewWrapperComponent } from './wrapper/wrapper.component';

@Component({
  selector: 'containerized-docker-volumes-view',
  standalone: true,
  imports: [NgxDataLayoutComponent, RouterOutlet],
  templateUrl: './view.component.html',
  providers: [
    provideDataLayout({
      wrapper: DockerVolumesViewWrapperComponent,
      components: [
        { component: DockerVolumesViewTableComponent, name: 'table' },
        { component: DockerVolumesViewCardsComponent, name: 'cards' },
      ],
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerVolumesViewComponent {
  private readonly dockerVolumesStore = inject(DockerVolumesStore);

  readonly dockerVolumes = this.dockerVolumesStore.entities;
}
