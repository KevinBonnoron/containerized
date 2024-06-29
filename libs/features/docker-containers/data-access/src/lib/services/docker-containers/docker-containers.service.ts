import { Injectable } from '@angular/core';

import { DockerRemoteService } from '@containerized/data-access';
import { DockerContainerDto, DockerContainerDtos } from '@containerized/shared';

@Injectable()
export class DockerContainersService extends DockerRemoteService {
  getAll() {
    return this.get<DockerContainerDtos>(`/containers`);
  }

  create(dockerContainer: Omit<DockerContainerDto, 'id' | 'created' | 'status'>) {
    return this.post<DockerContainerDto>(`/containers`, dockerContainer);
  }

  update(id: DockerContainerDto['id'], dockerContainer: DockerContainerDto) {
    // TODO this method does not exist on backend
    return this.put<DockerContainerDto>(`/containers/${id}`, dockerContainer);
  }

  remove(dockerContainer: DockerContainerDto) {
    return this.delete<string>(`/containers/${dockerContainer.id}`);
  }

  start(id: DockerContainerDto['id']) {
    return this.post(`/containers/${id}/start`, null);
  }

  stop(id: DockerContainerDto['id']) {
    return this.post(`/containers/${id}/stop`, null);
  }

  run(dockerContainer: Omit<DockerContainerDto, 'id' | 'created' | 'status'>) {
    return this.post<DockerContainerDto>(`/containers/run`, dockerContainer);
  }
}
