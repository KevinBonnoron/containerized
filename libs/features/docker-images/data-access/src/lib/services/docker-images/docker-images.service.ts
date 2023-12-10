import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { DockerImagesEntity } from '../../+state/docker-images.models';

@Injectable()
export class DockerImagesService {
  private readonly httpClient = inject(HttpClient);

  loadAll() {
    return this.httpClient.get<DockerImagesEntity[]>('http://localhost:3000/api/docker/images');
  }
}
