import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { EnvironmentsStore } from '@containerized/features/environments/data-access';
import { EnvironmentDto } from '@containerized/shared';
import { map } from 'rxjs';
import { EnvironmentsFormComponent } from '../form/form.component';

@Component({
  standalone: true,
  imports: [EnvironmentsFormComponent, MatDialogModule],
  selector: 'containerized-docker-containers-edit',
  templateUrl: './edit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnvironmentsEditComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly matDialogRef = inject(MatDialogRef);
  private readonly matSnackBar = inject(MatSnackBar);
  private readonly environmentsStore = inject(EnvironmentsStore);

  readonly environment = toSignal<EnvironmentDto>(this.activatedRoute.data.pipe(map(({ environment }) => environment)), { requireSync: true });

  onSubmitted(environment: EnvironmentDto) {
    this.environmentsStore.update(environment);
    this.environmentsStore
      .whenSuccess(() => this.matDialogRef.close())
      .whenFailure(() => this.matSnackBar.open('Error', 'X', { horizontalPosition: 'end', verticalPosition: 'top', duration: 5000 }));
  }
}
