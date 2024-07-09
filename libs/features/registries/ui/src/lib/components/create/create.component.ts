import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistriesStore } from '@containerized/features/registries/data-access';
import type { RegistryDto } from '@containerized/shared';
import { RegistriesFormComponent } from '../form/form.component';

@Component({
  selector: 'containerized-registries-create',
  standalone: true,
  imports: [RegistriesFormComponent, MatDialogModule],
  templateUrl: './create.component.html',
})
export class RegistriesCreateComponent {
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly matDialogRef = inject(MatDialogRef);
  private readonly registriesStore = inject(RegistriesStore);

  onSubmitted(registry: RegistryDto) {
    this.registriesStore.create(registry);
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
