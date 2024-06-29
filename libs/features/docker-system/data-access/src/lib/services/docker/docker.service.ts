import { Injectable } from '@angular/core';
import { DockerRemoteService } from '@containerized/data-access';
import { DockerInfoDto } from '@containerized/shared';

@Injectable({ providedIn: 'root' })
export class DockerSystemService extends DockerRemoteService {
  getInfo() {
    return this.get<DockerInfoDto>('/system/info');
  }
}
