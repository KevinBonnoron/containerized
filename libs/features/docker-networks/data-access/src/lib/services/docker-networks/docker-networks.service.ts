import { Injectable } from '@angular/core';
import { DockerRemoteService } from '@containerized/data-access';
import { DockerNetworkDto, DockerNetworkDtos } from '@containerized/shared';

@Injectable()
export class DockerNetworksService extends DockerRemoteService {
  getAll() {
    return this.get<DockerNetworkDtos>('/networks');
  }

  create(dockerNetwork: DockerNetworkDto) {
    return this.post<DockerNetworkDto>('/networks', dockerNetwork);
  }

  update(id: DockerNetworkDto['id'], dockerNetwork: DockerNetworkDto) {
    // TODO this method does not exist on backend
    return this.put<DockerNetworkDto>(`/networks/${id}`, dockerNetwork);
  }

  remove(dockerNetwork: DockerNetworkDto) {
    return this.delete<DockerNetworkDto['id']>(`/networks/${dockerNetwork.id}`);
  }
}
