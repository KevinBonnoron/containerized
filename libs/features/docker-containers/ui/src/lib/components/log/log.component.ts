import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { DockerContainerDto } from '@containerized/shared';
import { TranslateModule } from '@ngx-translate/core';
import { switchMap, tap, timer } from 'rxjs';
import { LogService } from './log.service';

interface DialogData {
  dockerContainer: DockerContainerDto;
}

@Component({
  selector: 'containerized-docker-containers-log',
  standalone: true,
  imports: [AsyncPipe, MatDialogModule, TranslateModule],
  templateUrl: './log.component.html',
  providers: [LogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerContainersLogComponent {
  private readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  private readonly dialogService = inject(LogService);

  private readonly containerElementRef = viewChild.required('container', { read: ElementRef });

  readonly logs$ = timer(0, 2000).pipe(
    switchMap(() => this.dialogService.getLogs(this.dockerContainer)),
    tap(() => {
      setTimeout(() => {
        const containerElementRef = this.containerElementRef();
        containerElementRef.nativeElement.scrollTop = containerElementRef.nativeElement.scrollHeight;
      }, 100);
    })
  );

  get dockerContainer() {
    return this.data.dockerContainer;
  }
}
