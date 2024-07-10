import { Component, computed, effect, inject, input } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { entriesOf, isArray } from 'monadojs';
import { DataLayoutStore } from 'ngx-data-layout';
import { ToggleButtonComponent } from '../toggle-button/toggle-button.component';

interface BaseFilter {
  name: string;
}

export interface SelectFilter extends BaseFilter {
  type: 'select';
  values: { label: string; value: unknown }[];
  multiple?: boolean;
}

interface TextFilter extends BaseFilter {
  type: 'text';
}

export type Filter = SelectFilter | TextFilter;

@Component({
  selector: 'containerized-data-layout-filters',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, ToggleButtonComponent],
  templateUrl: './data-layout-filters.component.html',
})
export class NgxDataLayoutFiltersComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly dataLayoutStore = inject(DataLayoutStore);

  readonly filters = input.required<Filter[]>();
  readonly formGroup = computed(() => {
    const filters = this.filters();

    const formControls: Record<string, FormControl> = {};
    for (const filter of filters) {
      formControls[filter.name] = this.formBuilder.control('');
    }

    return this.formBuilder.group(formControls);
  });

  constructor() {
    effect(() => {
      const filters = this.filters();
      const formGroup = this.formGroup();
      formGroup.valueChanges.subscribe((filterValues) => {
        const dataLayoutFilters: any = {};
        for (const [key, filterValue] of entriesOf(filterValues)) {
          // TODO when fixing monado should replace this with a: if (isEmpty(filterValue))
          if (filterValue === null || filterValue === undefined || filterValue.length === 0) {
            continue;
          }

          dataLayoutFilters[key] = (value: string | string[]) => (isArray(value) ? value.some((v) => v.includes(filterValue)) : value.includes(filterValue));
        }

        this.dataLayoutStore.setFilters(dataLayoutFilters);
      });
    });
  }
}
