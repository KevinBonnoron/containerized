import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DockerEventsStore } from '@containerized/features/docker-events/data-access';
import { NgxDataLayoutWrapperComponent } from '@containerized/ui';
import { NgxDataLayoutComponent, provideDataLayout } from 'ngx-data-layout';
import { DockerEventsViewCardsComponent } from './cards/cards.component';
import { DockerEventsViewTableComponent } from './table/table.component';

@Component({
  selector: 'containerized-docker-events-view',
  standalone: true,
  imports: [NgxDataLayoutComponent],
  templateUrl: './view.component.html',
  providers: [
    provideDataLayout({
      wrapper: NgxDataLayoutWrapperComponent,
      components: [
        { component: DockerEventsViewCardsComponent, name: 'cards' },
        { component: DockerEventsViewTableComponent, name: 'table' },
      ]
    })
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerEventsViewComponent {
  private readonly dockerEventsStore = inject(DockerEventsStore);

  readonly dockerEvents = this.dockerEventsStore.entities;
}
