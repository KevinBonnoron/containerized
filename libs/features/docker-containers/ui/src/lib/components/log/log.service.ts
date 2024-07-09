import { Injectable } from '@angular/core';
import { DockerRemoteService } from '@containerized/data-access';
import { DockerContainerDto } from '@containerized/shared';
import { map } from 'rxjs';

@Injectable()
export class LogService extends DockerRemoteService {
  getLogs(dockerContainer: DockerContainerDto) {
    return this.get(`/containers/${dockerContainer.id}/logs`, { responseType: 'text' }).pipe(map((value) => value.replace(/\n/g, '<br/>')));
  }
}
