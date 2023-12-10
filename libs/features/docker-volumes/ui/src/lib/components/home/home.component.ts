import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { DockerVolumesFacade } from '@containerized/features/docker-volumes/data-access';

import { DockerVolumeListComponent } from '../list/list.component';

@Component({
  standalone: true,
  imports: [DockerVolumeListComponent],
  selector: 'containerized-docker-volumes-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerVolumeHomeComponent implements OnInit {
  private readonly dockerVolumesFacade = inject(DockerVolumesFacade);

  ngOnInit() {
    this.dockerVolumesFacade.load();
  }
}
