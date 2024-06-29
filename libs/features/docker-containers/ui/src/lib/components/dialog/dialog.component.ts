import { Component, ComponentFactoryResolver, inject, Injector, OnInit, Type } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DockerContainerDto } from '@containerized/shared';
import { map } from 'rxjs';

@Component({
  selector: 'containerized-docker-containers-dialog',
  standalone: true,
  template: '',
})
export class DockerContainersDialogComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly matDialog = inject(MatDialog);
  private readonly injector = inject(Injector);

  readonly dockerContainer = toSignal<DockerContainerDto>(this.activatedRoute.data.pipe(map(({ dockerContainer }) => dockerContainer)), { requireSync: true });
  readonly dialogComponent = toSignal<Type<Component>>(this.activatedRoute.data.pipe(map(({ dialogComponent }) => dialogComponent)), { requireSync: true });

  ngOnInit(): void {
    this.matDialog.open(this.dialogComponent(), {
      injector: this.injector,
      componentFactoryResolver: this.injector.get(ComponentFactoryResolver), // TODO see https://github.com/angular/components/issues/25262
      minWidth: '80vw',
      data: { dockerContainer: this.dockerContainer() }
    }).afterClosed().subscribe(() => this.router.navigate(['../../'], { relativeTo: this.activatedRoute }));
  }
}
