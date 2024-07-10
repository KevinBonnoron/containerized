import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DockerNetworksStore } from '@containerized/features/docker-networks/data-access';
import { NgxDataLayoutComponent, provideDataLayout } from 'ngx-data-layout';
import { DockerNetworksCardsComponent } from './cards/cards.component';
import { DockerNetworksTableComponent } from './table/table.component';
import { DockerNetworksViewWrapperComponent } from './wrapper/wrapper.component';

@Component({
  selector: 'containerized-docker-networks-view',
  standalone: true,
  imports: [NgxDataLayoutComponent, RouterOutlet],
  templateUrl: './view.component.html',
  providers: [
    provideDataLayout({
      wrapper: DockerNetworksViewWrapperComponent,
      components: [
        { component: DockerNetworksTableComponent, name: 'table' },
        { component: DockerNetworksCardsComponent, name: 'cards' },
      ],
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerNetworksViewComponent {
  private readonly dockerNetworksStore = inject(DockerNetworksStore);

  readonly dockerNetworks = this.dockerNetworksStore.entities;
}
