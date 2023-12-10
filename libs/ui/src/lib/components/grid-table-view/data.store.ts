import { SelectionModel } from '@angular/cdk/collections';
import { Injectable, computed } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ComponentStore } from '@ngrx/component-store';
import { map } from 'rxjs';

@Injectable()
export class DataStore<T extends object> extends ComponentStore<{ values: T[] }> {
  private readonly selection = new SelectionModel<T>(true, []);

  readonly selected = toSignal(this.selection.changed.pipe(takeUntilDestroyed(), map(() => this.selection.selected)), { initialValue: [] });
  readonly values = this.selectSignal((state) => state.values);
  readonly isAllSelected = computed(() => this.selected().length > 0 && this.selected().length === this.values().length);
  readonly isSomeSelected = computed(() => this.selected().length > 0);

  constructor() {
    super({ values: [] });
  }

  isSelected(value: T) {
    return this.selection.isSelected(value);
  }

  toggle(value: T) {
    this.selection.toggle(value);
  }

  toggleAllRows() {
    this.isAllSelected() ? this.selection.clear() : this.selection.select(...this.values());
  };
}
