import { Component, ComponentFactoryResolver, inject, Injector, OnInit, Type } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvironmentDto } from '@containerized/shared';
import { map } from 'rxjs';

@Component({
  selector: 'containerized-environments-dialog',
  standalone: true,
  template: '',
})
export class EnvironmentsDialogComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly matDialog = inject(MatDialog);
  private readonly injector = inject(Injector);

  readonly environment = toSignal<EnvironmentDto>(this.activatedRoute.data.pipe(map(({ environment }) => environment)), { requireSync: true });
  readonly dialogComponent = toSignal<Type<Component>>(this.activatedRoute.data.pipe(map(({ dialogComponent }) => dialogComponent)), { requireSync: true });

  ngOnInit(): void {
    this.matDialog.open(this.dialogComponent(), {
      injector: this.injector,
      componentFactoryResolver: this.injector.get(ComponentFactoryResolver), // TODO see https://github.com/angular/components/issues/25262
      minWidth: '80vw',
      data: { environment: this.environment() }
    }).afterClosed().subscribe(() => this.router.navigate(['../../'], { relativeTo: this.activatedRoute }));
  }
}
