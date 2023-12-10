import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { DockerVolumesEntity } from '../../+state/docker-volumes.models';

@Injectable()
export class DockerVolumesService {
  private readonly httpClient = inject(HttpClient);

  loadAll() {
    return this.httpClient.get<DockerVolumesEntity[]>('http://localhost:3000/api/docker/volumes');
  }
}
