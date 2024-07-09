import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DockerImagesStore } from '@containerized/features/docker-images/data-access';
import { NgxDataLayoutWrapperComponent } from '@containerized/ui';
import { NgxDataLayoutComponent, provideDataLayout } from 'ngx-data-layout';
import { DockerImagesViewCardsComponent } from './cards/cards.component';
import { DockerImagesViewTableComponent } from './table/table.component';

@Component({
  standalone: true,
  imports: [NgxDataLayoutComponent],
  templateUrl: './view.component.html',
  providers: [
    provideDataLayout({
      wrapper: NgxDataLayoutWrapperComponent,
      components: [
        { component: DockerImagesViewCardsComponent, name: 'cards' },
        { component: DockerImagesViewTableComponent, name: 'table' },
      ],
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerImagesViewComponent {
  private readonly dockerImagesStore = inject(DockerImagesStore);

  readonly dockerImages = this.dockerImagesStore.entities;
}
