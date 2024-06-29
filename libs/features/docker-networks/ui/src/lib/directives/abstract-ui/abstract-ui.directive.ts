import { Directive, inject } from '@angular/core';
import { DockerNetworksStore } from '@containerized/features/docker-networks/data-access';
import { DockerNetworkDto } from '@containerized/shared';
import { DataLayoutComponent } from 'ngx-data-layout';

@Directive({
  standalone: true
})
export abstract class AbstractUiDirective extends DataLayoutComponent<DockerNetworkDto> {
  private readonly dockerNetworksStore = inject(DockerNetworksStore);

  removeNetwork(dockerNetwork: DockerNetworkDto) {
    this.dockerNetworksStore.remove(dockerNetwork);
  }
}
