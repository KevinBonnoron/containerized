import { Injectable } from '@angular/core';
import { DockerRemoteService } from '@containerized/data-access';
import { DockerImageDto } from '@containerized/shared';
import { of } from 'rxjs';

@Injectable()
export class DockerImagesService extends DockerRemoteService {
  getAll() {
    return this.get<DockerImageDto[]>('/images');
  }

  create(dockerImage: DockerImageDto) {
    // TODO
    return of<DockerImageDto>();
  }

  update(id: DockerImageDto['id'], dockerImage: DockerImageDto) {
    return of<DockerImageDto>();
  }

  remove(dockerImage: DockerImageDto) {
    return this.delete<string>(`/images/${dockerImage.id}`);
  }
}
