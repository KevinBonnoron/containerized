import { Injectable } from '@angular/core';
import { DockerRemoteService } from '@containerized/data-access';
import { DockerVolumeDto, DockerVolumeDtos } from '@containerized/shared';

@Injectable()
export class DockerVolumesService extends DockerRemoteService {
  getAll() {
    return this.get<DockerVolumeDtos>('/volumes');
  }

  create(dockerVolume: DockerVolumeDto) {
    return this.post<DockerVolumeDto>('/volumes', dockerVolume);
  }

  update(name: string, dockerVolume: DockerVolumeDto) {
    return this.put<DockerVolumeDto>(`/volumes/${name}`, dockerVolume);
  }

  remove(dockerVolume: DockerVolumeDto) {
    return this.delete<string>(`/volumes/${dockerVolume.name}`);
  }
}
