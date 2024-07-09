import { ChangeDetectionStrategy, Component, OnInit, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { DockerContainerDto, DockerContainerEnvironment, DockerContainerLabel, DockerContainerPort, DockerContainerVolume, DockerRunCommand } from '@containerized/shared';
import { AngularRemixIconComponent } from 'angular-remix-icon';
import { DockerCommandParserDialogComponent } from './docker-command-parser-dialog/docker-command-parser-dialog.component';
import { DockerContainersFormEnvironmentComponent } from './form-environment/form-environment.component';
import { DockerContainersFormLabelComponent } from './form-label/form-label.component';
import { DockerContainersFormPortComponent } from './form-port/form-port.component';
import { DockerContainersFormVolumeComponent } from './form-volume/form-volume.component';

@Component({
  selector: 'containerized-docker-containers-form',
  standalone: true,
  imports: [AngularRemixIconComponent, DockerContainersFormEnvironmentComponent, DockerContainersFormLabelComponent, DockerContainersFormPortComponent, DockerContainersFormVolumeComponent, MatButtonModule, MatFormFieldModule, MatInputModule, MatTabsModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerContainersFormComponent implements OnInit {
  private readonly matDialog = inject(MatDialog);
  private readonly formBuilder = inject(FormBuilder);

  readonly dockerContainer = input<DockerContainerDto>();
  readonly submitted = output<DockerContainerDto>();

  readonly formGroup = this.formBuilder.nonNullable.group({
    id: [''],
    image: ['', [Validators.required]],
    name: [''],
    ports: [[] as DockerContainerPort[]],
    volumes: [[] as DockerContainerVolume[]],
    environments: [[] as DockerContainerEnvironment[]],
    labels: [[] as DockerContainerLabel[]],
  });

  ngOnInit() {
    const dockerContainer = this.dockerContainer();
    if (dockerContainer) {
      this.formGroup.setValue({
        id: dockerContainer.id,
        image: dockerContainer.image,
        name: dockerContainer.name,
        volumes: dockerContainer.volumes,
        environments: dockerContainer.environments,
        ports: dockerContainer.ports,
        labels: dockerContainer.labels,
      });
    }
  }

  openDockerCommandParserModal() {
    const [image, tag = 'latest'] = this.imageCtrl.value.split(':');
    const dockerCommand: DockerRunCommand = {
      type: 'run',
      image,
      options: {
        name: this.nameCtrl.value,
        volumes: this.volumesCtrl.value.map((volume) => ({
          host: volume.type === 'named' ? volume.name : volume.source,
          container: volume.destination,
          type: volume.type,
        })),
        environments: this.environmentsCtrl.value.reduce((accumulator, { key, value }) => ({ ...accumulator, [key]: value }), {}),
        publish: this.portsCtrl.value,
        labels: this.labelsCtrl.value.reduce((accumulator, { key, value }) => ({ ...accumulator, [key]: value }), {}),
      },
      tag,
    };

    this.matDialog
      .open(DockerCommandParserDialogComponent, { data: { dockerCommand } })
      .afterClosed()
      .subscribe((result?: DockerRunCommand) => {
        if (result) {
          this.imageCtrl.setValue(result.image);

          if (result.options.name) {
            this.nameCtrl.setValue(result.options.name);
          }

          if (result.options.volumes) {
            this.volumesCtrl.setValue(
              result.options.volumes.map((volume) => {
                if (volume.type === 'named') {
                  return {
                    type: 'named',
                    name: volume.host,
                    destination: volume.container,
                    mode: 'z',
                    propgation: 'rprivate',
                    rw: false,
                    driver: 'local',
                  } as DockerContainerVolume;
                } else {
                  return {
                    type: 'bind',
                    source: volume.host,
                    destination: volume.container,
                    mode: 'z',
                    propgation: 'rprivate',
                    rw: false,
                    driver: 'local',
                  } as DockerContainerVolume;
                }
              })
            );
          }

          if (result.options.publish) {
            this.portsCtrl.setValue(result.options.publish);
          }
        }
      });
  }

  onSubmit(dockerContainer: Partial<DockerContainerDto>) {
    // TODO add checks
    this.submitted.emit(dockerContainer as DockerContainerDto);
  }

  get imageCtrl() {
    return this.formGroup.controls.image;
  }

  get nameCtrl() {
    return this.formGroup.controls.name;
  }

  get volumesCtrl() {
    return this.formGroup.controls.volumes;
  }

  get environmentsCtrl() {
    return this.formGroup.controls.environments;
  }

  get portsCtrl() {
    return this.formGroup.controls.ports;
  }

  get labelsCtrl() {
    return this.formGroup.controls.labels;
  }
}
