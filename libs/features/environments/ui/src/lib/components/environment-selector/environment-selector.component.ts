import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { EnvironmentsStore } from '@containerized/features/environments/data-access';
import { EnvironmentDto } from '@containerized/shared';

@Component({
  selector: 'containerized-environment-selector',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
  templateUrl: './environment-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnvironmentSelectorComponent implements OnInit {
  private readonly environmentsStore = inject(EnvironmentsStore);

  readonly environments = this.environmentsStore.entities;
  readonly formControl = new FormControl();

  ngOnInit() {
    const environmentSelected = this.environmentsStore.selected();
    this.formControl.setValue(environmentSelected ?? '');
  }

  selectEnvironment(environment: EnvironmentDto) {
    this.environmentsStore.selectId(environment.id);
  }
}
