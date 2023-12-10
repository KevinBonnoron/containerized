import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Input, OnChanges, QueryList, SimpleChanges, TemplateRef, ViewChild, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AngularRemixIconComponent } from 'angular-remix-icon';
import { prop } from 'monadojs';

import { DataStore } from './data.store';

export interface Column<T> {
  id: keyof T | string;
  title: string;
  cssClass?: string;
}

export type Columns<T> = Column<T>[];

@Component({
  standalone: true,
  imports: [AngularRemixIconComponent, MatCardModule, MatCheckboxModule, MatTableModule, NgTemplateOutlet],
  selector: 'containerized-grid-table-view',
  templateUrl: './grid-table-view.component.html',
  styleUrl: './grid-table-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DataStore],
})
export class GridTableViewComponent<T extends object> implements OnChanges {
  private readonly dataStore = inject(DataStore<T>);

  @Input()
  values!: T[];

  @Input()
  columns!: Columns<T>;

  // TODO rewrite as directives
  @ContentChild('actions', { descendants: false, static: true })
  actionsTemplate!: TemplateRef<unknown>;

  @ContentChild('gridTemplate', { descendants: false, static: true })
  gridTemplate!: TemplateRef<unknown>;

  @ContentChild('cardHeader', { descendants: false, static: true })
  cardHeaderTemplate!: TemplateRef<unknown>;

  @ContentChild('cardContent', { descendants: false, static: true })
  cardContentTemplate!: TemplateRef<unknown>;

  @ContentChild('cardFooter', { descendants: false, static: true })
  cardFooterTemplate!: TemplateRef<unknown>;

  @ContentChildren(TemplateRef, { descendants: false })
  children!: QueryList<TemplateRef<unknown>>;

  @ViewChild('defaultCellDataTemplate')
  defaultCellDataTemplateRef!: TemplateRef<unknown>;

  readonly dataSource = computed(() => new MatTableDataSource(this.dataStore.values()));
  readonly isAllSelected = this.dataStore.isAllSelected;
  readonly isSomeSelected = this.dataStore.isSomeSelected;
  readonly selected = this.dataStore.selected;

  currentView: 'grid' | 'table' = 'table';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['values']) {
      this.dataStore.patchState({ values: this.values });
    }
  }

  changeView(view: typeof this.currentView) {
    this.currentView = view;
  }

  getTemplateOutlet(column: Column<T>) {
    const overridedDataCellName = `${String(column.id)}CellDataTemplate`;
    const overridedDataCellTemplateRef = this.children.find((templateRef: any) =>
      templateRef._declarationTContainer.localNames?.includes(overridedDataCellName)
    );

    return overridedDataCellTemplateRef ?? this.defaultCellDataTemplateRef;
  }

  isSelected(value: T) {
    return this.dataStore.isSelected(value);
  }

  toggle(element: T) {
    this.dataStore.toggle(element);
  }

  toggleAllRows() {
    this.dataStore.toggleAllRows();
  }

  get displayedColumns() {
    return ['select', ...(this.columns ?? []).map(prop('id'))];
  }
}
