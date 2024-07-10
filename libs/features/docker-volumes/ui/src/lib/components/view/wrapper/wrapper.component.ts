import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DockerVolumesStore } from '@containerized/features/docker-volumes/data-access';
import { DockerVolumeDto } from '@containerized/shared';
import { ConfirmButtonComponent, Filter, NgxDataLayoutFiltersComponent } from '@containerized/ui';
import { AngularRemixIconComponent } from 'angular-remix-icon';
import { DataLayoutStore, NgxDataLayoutContentComponent } from 'ngx-data-layout';

@Component({
  selector: 'containerized-docker-volumes-wrapper',
  standalone: true,
  imports: [AngularRemixIconComponent, ConfirmButtonComponent, MatButtonModule, MatIconModule, NgxDataLayoutContentComponent, RouterLink, NgxDataLayoutFiltersComponent],
  templateUrl: './wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerVolumesViewWrapperComponent {
  private readonly dataLayoutStore = inject(DataLayoutStore<DockerVolumeDto>);
  private readonly dockerVolumesStore = inject(DockerVolumesStore);

  readonly someOrAllSelected = computed(() => !this.dataLayoutStore.noneSelected());

  readonly layout = this.dataLayoutStore.layout;
  readonly filters: Filter[] = [];

  setLayout(layout: string) {
    this.dataLayoutStore.setLayout(layout);
  }

  removeNetworks() {
    for (const dockerVolume of this.dataLayoutStore.selected()) {
      this.dockerVolumesStore.remove(dockerVolume);
    }
  }
}
