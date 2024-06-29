import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnvironmentsStore } from '@containerized/features/environments/data-access';
import { EnvironmentDto } from '@containerized/shared';
import { EnvironmentsFormComponent } from '../form/form.component';

@Component({
  selector: 'containerized-environments-create',
  standalone: true,
  imports: [EnvironmentsFormComponent, MatDialogModule],
  templateUrl: './create.component.html',
})
export class EnvironmentsCreateComponent {
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly matDialogRef = inject(MatDialogRef);
  private readonly environmentsStore = inject(EnvironmentsStore);

  onSubmitted(environment: EnvironmentDto) {
    this.environmentsStore.create(environment);
    this.environmentsStore
      .whenSuccess(() => this.matDialogRef.close())
      .whenFailure(() => this.matSnackBar.open('Error', 'X', { horizontalPosition: 'end', verticalPosition: 'top', duration: 5000 }));
  }
}
