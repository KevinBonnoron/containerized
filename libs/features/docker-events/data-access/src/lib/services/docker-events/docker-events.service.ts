import { Injectable } from '@angular/core';

import { DockerRemoteService } from '@containerized/data-access';

import { DockerEventDto } from '@containerized/shared';
import { of } from 'rxjs';

@Injectable()
export class DockerEventsService extends DockerRemoteService {
  getAll() {
    return this.get<DockerEventDto[]>(`/events`);
  }

  create() {
    // TODO
    return of<DockerEventDto>();
  }

  update() {
    // TODO
    return of<DockerEventDto>();
  }

  remove() {
    // TODO
    return of<string>();
  }
}
