import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { DockerContainersEntity } from '../../+state/docker-containers.models';

@Injectable()
export class DockerContainersService {
  private readonly httpClient = inject(HttpClient);

  loadAll(environmentId: number) {
    return this.httpClient.get<DockerContainersEntity[]>(`http://localhost:3000/api/docker/${environmentId}/containers`);
  }

  create(environmentId: number, dockerContainer: Omit<DockerContainersEntity, 'id' | 'created' | 'status'>) {
    return this.httpClient.post<DockerContainersEntity>(`http://localhost:3000/api/docker/${environmentId}/containers`, dockerContainer);
  }

  start(environmentId: number, id: DockerContainersEntity['id']) {
    return this.httpClient.post(`http://localhost:3000/api/docker/${environmentId}/containers/${id}/start`, null);
  }

  stop(environmentId: number, id: DockerContainersEntity['id']) {
    return this.httpClient.post(`http://localhost:3000/api/docker/${environmentId}/containers/${id}/stop`, null);
  }

  delete(environmentId: number, id: DockerContainersEntity['id']) {
    return this.httpClient.delete<DockerContainersEntity>(`http://localhost:3000/api/docker/${environmentId}/containers/${id}`);
  }
}
