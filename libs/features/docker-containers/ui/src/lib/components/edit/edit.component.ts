import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { DockerContainersEntity, DockerContainersFacade } from '@containerized/features/docker-containers/data-access';

import { DockerContainerFormComponent } from '../form/form.component';

@Component({
  standalone: true,
  imports: [DockerContainerFormComponent],
  selector: 'containerized-docker-containers-edit',
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerContainerEditComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly dockerContainersFacade = inject(DockerContainersFacade);

  readonly dockerContainer = toSignal(this.activatedRoute.data.pipe(map(({ dockerContainer }) => dockerContainer as DockerContainersEntity)));
}
