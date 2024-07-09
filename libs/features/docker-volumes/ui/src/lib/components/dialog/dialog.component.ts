import { Component, ComponentFactoryResolver, Injector, OnInit, Type, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DockerVolumeDto } from '@containerized/shared';
import { map } from 'rxjs';

@Component({
  selector: 'containerized-docker-volumes-dialog',
  standalone: true,
  template: '',
})
export class DockerVolumesDialogComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly matDialog = inject(MatDialog);
  private readonly injector = inject(Injector);

  readonly dockerVolume = toSignal<DockerVolumeDto>(this.activatedRoute.data.pipe(map(({ dockerVolume }) => dockerVolume)), { requireSync: true });
  readonly dialogComponent = toSignal<Type<Component>>(this.activatedRoute.data.pipe(map(({ dialogComponent }) => dialogComponent)), { requireSync: true });

  ngOnInit(): void {
    this.matDialog
      .open(this.dialogComponent(), {
        injector: this.injector,
        componentFactoryResolver: this.injector.get(ComponentFactoryResolver), // TODO see https://github.com/angular/components/issues/25262
        minWidth: '80vw',
        data: { dockerVolume: this.dockerVolume() },
      })
      .afterClosed()
      .subscribe(() => this.router.navigate(['../../'], { relativeTo: this.activatedRoute }));
  }
}
