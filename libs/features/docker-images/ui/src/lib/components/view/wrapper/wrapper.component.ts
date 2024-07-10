import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DockerImagesStore } from '@containerized/features/docker-images/data-access';
import { DockerImageDto } from '@containerized/shared';
import { ConfirmButtonComponent, Filter, NgxDataLayoutFiltersComponent } from '@containerized/ui';
import { AngularRemixIconComponent } from 'angular-remix-icon';
import { DataLayoutStore, NgxDataLayoutContentComponent } from 'ngx-data-layout';

@Component({
  selector: 'containerized-docker-images-wrapper',
  standalone: true,
  imports: [AngularRemixIconComponent, ConfirmButtonComponent, MatButtonModule, MatIconModule, NgxDataLayoutContentComponent, RouterLink, NgxDataLayoutFiltersComponent],
  templateUrl: './wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerImagesViewWrapperComponent {
  private readonly dataLayoutStore = inject(DataLayoutStore<DockerImageDto>);
  private readonly dockerImagesStore = inject(DockerImagesStore);

  readonly someOrAllSelected = computed(() => !this.dataLayoutStore.noneSelected());

  readonly layout = this.dataLayoutStore.layout;
  readonly filters: Filter[] = [
    {
      type: 'select',
      name: 'used',
      values: [{ label: 'Used', value: true }],
    },
    {
      type: 'text',
      name: 'tags',
    },
  ];

  setLayout(layout: string) {
    this.dataLayoutStore.setLayout(layout);
  }

  pullImages() {
    for (const dockerImage of this.dataLayoutStore.selected()) {
      this.dockerImagesStore.pull(dockerImage.tags[0]);
    }
  }

  removeImages() {
    for (const dockerImage of this.dataLayoutStore.selected()) {
      this.dockerImagesStore.remove(dockerImage);
    }
  }
}
