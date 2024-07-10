import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { DockerNetworksStore } from '@containerized/features/docker-networks/data-access';
import { DockerNetworkDto } from '@containerized/shared';
import { ConfirmButtonComponent, Filter, NgxDataLayoutFiltersComponent } from '@containerized/ui';
import { AngularRemixIconComponent } from 'angular-remix-icon';
import { DataLayoutStore, NgxDataLayoutContentComponent } from 'ngx-data-layout';

@Component({
  selector: 'containerized-docker-networks-wrapper',
  standalone: true,
  imports: [AngularRemixIconComponent, ConfirmButtonComponent, MatButtonModule, NgxDataLayoutContentComponent, RouterLink, NgxDataLayoutFiltersComponent],
  templateUrl: './wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerNetworksViewWrapperComponent {
  private readonly dataLayoutStore = inject(DataLayoutStore<DockerNetworkDto>);
  private readonly dockerNetworksStore = inject(DockerNetworksStore);

  readonly someOrAllSelected = computed(() => !this.dataLayoutStore.noneSelected());

  readonly layout = this.dataLayoutStore.layout;
  readonly filters: Filter[] = [];

  setLayout(layout: string) {
    this.dataLayoutStore.setLayout(layout);
  }

  removeNetworks() {
    for (const dockerNetwork of this.dataLayoutStore.selected()) {
      this.dockerNetworksStore.remove(dockerNetwork);
    }
  }
}
