import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { DockerImagesFacade } from '@containerized/features/docker-images/data-access';

import { DockerImageListComponent } from '../list/list.component';

@Component({
  standalone: true,
  imports: [DockerImageListComponent],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerImageHomeComponent implements OnInit {
  private readonly dockerImagesFacade = inject(DockerImagesFacade);

  ngOnInit() {
    this.dockerImagesFacade.load();
  }
}
