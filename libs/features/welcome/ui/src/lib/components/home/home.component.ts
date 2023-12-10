import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { EnvironmentsFacade } from '@containerized/features/environments/data-access';
import { EnvironmentDto } from '@containerized/shared';
import { skipEmpty } from '@containerized/utils';

@Component({
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  selector: 'containerized-welcome-home',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeHomeComponent {
  private readonly environmentsFacade = inject(EnvironmentsFacade);

  readonly environments = this.environmentsFacade.allEnvironments;
  readonly environmentCtrl = new FormControl<EnvironmentDto | undefined>(this.environmentsFacade.selected(), Validators.required);

  constructor() {
    this.environmentCtrl.valueChanges.pipe(
      takeUntilDestroyed(),
      skipEmpty()
    ).subscribe((environment) => this.environmentsFacade.setSelectedId(environment.id))
  }
}
