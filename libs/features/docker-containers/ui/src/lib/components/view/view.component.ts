import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DockerContainersStore } from '@containerized/features/docker-containers/data-access';
import { NgxDataLayoutWrapperComponent } from '@containerized/ui';
import { NgxDataLayoutComponent, provideDataLayout } from 'ngx-data-layout';
import { DockerContainersViewCardsComponent } from './cards/cards.component';
import { DockerContainersViewTableComponent } from './table/table.component';

@Component({
  selector: 'containerized-docker-containers-view',
  standalone: true,
  imports: [NgxDataLayoutComponent, RouterOutlet],
  templateUrl: './view.component.html',
  providers: [
    provideDataLayout({
      wrapper: NgxDataLayoutWrapperComponent,
      components: [
        { component: DockerContainersViewCardsComponent, name: 'cards' },
        { component: DockerContainersViewTableComponent, name: 'table' },
      ]
    })
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerContainersViewComponent {
  protected readonly dockerContainerStore = inject(DockerContainersStore);

  readonly dockerContainers = this.dockerContainerStore.entities;
}