import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DockerImagesStore } from '@containerized/features/docker-images/data-access';
import { NgxDataLayoutComponent, provideDataLayout } from 'ngx-data-layout';
import { DockerImagesViewCardsComponent } from './cards/cards.component';
import { DockerImagesViewTableComponent } from './table/table.component';
import { DockerImagesViewWrapperComponent } from './wrapper/wrapper.component';

@Component({
  standalone: true,
  imports: [NgxDataLayoutComponent],
  templateUrl: './view.component.html',
  providers: [
    provideDataLayout({
      wrapper: DockerImagesViewWrapperComponent,
      components: [
        { component: DockerImagesViewTableComponent, name: 'table' },
        { component: DockerImagesViewCardsComponent, name: 'cards' },
      ],
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerImagesViewComponent {
  private readonly dockerImagesStore = inject(DockerImagesStore);

  readonly dockerImages = this.dockerImagesStore.entities;
}
