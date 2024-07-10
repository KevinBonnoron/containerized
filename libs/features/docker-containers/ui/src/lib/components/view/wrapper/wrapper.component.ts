import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { DockerContainersStore } from '@containerized/features/docker-containers/data-access';
import { DockerContainerDto } from '@containerized/shared';
import { ConfirmButtonComponent, Filter, NgxDataLayoutFiltersComponent } from '@containerized/ui';
import { AngularRemixIconComponent } from 'angular-remix-icon';
import { DataLayoutStore, NgxDataLayoutContentComponent } from 'ngx-data-layout';

@Component({
  selector: 'containerized-docker-containers-wrapper',
  standalone: true,
  imports: [AngularRemixIconComponent, ConfirmButtonComponent, MatButtonModule, MatIconModule, NgxDataLayoutContentComponent, RouterLink, NgxDataLayoutFiltersComponent],
  templateUrl: './wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerContainersViewWrapperComponent {
  private readonly dataLayoutStore = inject(DataLayoutStore<DockerContainerDto>);
  private readonly dockerContainersStore = inject(DockerContainersStore);

  readonly someOrAllSelected = computed(() => !this.dataLayoutStore.noneSelected());
  readonly selectionExited = computed(() => this.dataLayoutStore.selected().every((element) => element.status === 'exited'));
  readonly selectionCreated = computed(() => this.dataLayoutStore.selected().every((element) => element.status === 'created'));
  readonly selectionRunning = computed(() => this.dataLayoutStore.selected().every((element) => element.status === 'running'));

  readonly layout = this.dataLayoutStore.layout;
  readonly filters: Filter[] = [
    {
      type: 'text',
      name: 'name',
    },
    {
      type: 'select',
      name: 'status',
      multiple: true,
      values: [
        { label: 'Running', value: 'running' },
        { label: 'Paused', value: 'paused' },
        { label: 'Exited', value: 'exited' },
      ],
    },
  ];

  setLayout(layout: string) {
    this.dataLayoutStore.setLayout(layout);
  }

  startContainers() {
    for (const dockerContainer of this.dataLayoutStore.selected()) {
      this.dockerContainersStore.start(dockerContainer.id);
    }
  }

  restartContainers() {
    for (const dockerContainer of this.dataLayoutStore.selected()) {
      this.dockerContainersStore.restart(dockerContainer.id);
    }
  }

  stopContainers() {
    for (const dockerContainer of this.dataLayoutStore.selected()) {
      this.dockerContainersStore.stop(dockerContainer.id);
    }
  }

  removeContainers() {
    for (const dockerContainer of this.dataLayoutStore.selected()) {
      this.dockerContainersStore.remove(dockerContainer);
    }
  }
}
