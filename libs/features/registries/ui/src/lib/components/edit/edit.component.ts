import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RegistriesStore } from '@containerized/features/registries/data-access';
import type { RegistryDto } from '@containerized/shared';
import { map } from 'rxjs';
import { RegistriesFormComponent } from '../form/form.component';

@Component({
  standalone: true,
  imports: [RegistriesFormComponent, MatDialogModule],
  selector: 'containerized-docker-containers-edit',
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistriesEditComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly matDialogRef = inject(MatDialogRef);
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly registriesStore = inject(RegistriesStore);

  readonly registry = toSignal<RegistryDto>(this.activatedRoute.data.pipe(map(({ registry }) => registry)), { requireSync: true });

  onSubmitted(registry: RegistryDto) {
    this.registriesStore.update(registry);
    this.registriesStore
      .whenSuccess(() => this.matDialogRef.close())
      .whenFailure(() =>
        this.matSnackBar.open('Error', 'X', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 5000,
        })
      );
  }
}
