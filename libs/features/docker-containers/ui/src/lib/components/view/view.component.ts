import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DockerContainersStore } from '@containerized/features/docker-containers/data-access';
import { NgxDataLayoutComponent, provideDataLayout } from 'ngx-data-layout';
import { DockerContainersViewCardsComponent } from './cards/cards.component';
import { DockerContainersViewTableComponent } from './table/table.component';
import { DockerContainersViewWrapperComponent } from './wrapper/wrapper.component';

@Component({
  selector: 'containerized-docker-containers-view',
  standalone: true,
  imports: [NgxDataLayoutComponent, RouterOutlet],
  templateUrl: './view.component.html',
  providers: [
    provideDataLayout({
      wrapper: DockerContainersViewWrapperComponent,
      components: [
        { component: DockerContainersViewTableComponent, name: 'table' },
        { component: DockerContainersViewCardsComponent, name: 'cards' },
      ],
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerContainersViewComponent {
  private readonly dockerContainerStore = inject(DockerContainersStore);

  readonly dockerContainers = this.dockerContainerStore.entities;
}
