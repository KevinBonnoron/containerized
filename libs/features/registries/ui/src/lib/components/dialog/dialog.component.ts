import { Component, ComponentFactoryResolver, Injector, type OnInit, type Type, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import type { RegistryDto } from '@containerized/shared';
import { map } from 'rxjs';

@Component({
  selector: 'containerized-registries-dialog',
  standalone: true,
  template: '',
})
export class RegistriesDialogComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly matDialog = inject(MatDialog);
  private readonly injector = inject(Injector);

  readonly registry = toSignal<RegistryDto>(this.activatedRoute.data.pipe(map(({ registry }) => registry)), { requireSync: true });
  readonly dialogComponent = toSignal<Type<Component>>(this.activatedRoute.data.pipe(map(({ dialogComponent }) => dialogComponent)), { requireSync: true });

  ngOnInit(): void {
    this.matDialog
      .open(this.dialogComponent(), {
        injector: this.injector,
        componentFactoryResolver: this.injector.get(ComponentFactoryResolver), // TODO see https://github.com/angular/components/issues/25262
        minWidth: '80vw',
        data: { registry: this.registry() },
      })
      .afterClosed()
      .subscribe(() => this.router.navigate(['../../'], { relativeTo: this.activatedRoute }));
  }
}
