import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { DockerContainersEntity } from '@containerized/features/docker-containers/data-access';
import { WithReactiveChanges } from '@containerized/ui';

@Component({
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule],
  selector: 'containerized-docker-containers-form',
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DockerContainerFormComponent extends WithReactiveChanges('dockerContainer') implements OnChanges {
  @Input()
  dockerContainer?: DockerContainersEntity;

  @Output()
  readonly submitted = new EventEmitter();

  readonly formGroup = new FormGroup({});
}
