import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';

import { DockerContainersFacade } from '@containerized/features/docker-containers/data-access';

import { DockerContainerFormComponent } from '../form/form.component';
import { DockerContainerListComponent } from '../list/list.component';

@Component({
  standalone: true,
  imports: [DockerContainerListComponent, DockerContainerFormComponent],
  selector: 'containerized-docker-containers-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerContainerHomeComponent implements OnInit {
  private readonly dockerContainerFacade = inject(DockerContainersFacade);

  ngOnInit() {
    this.dockerContainerFacade.load();
  }
}
