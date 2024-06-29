import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, viewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AbstractUiDirective } from '../../../directives';

@Component({
  selector: 'containerized-docker-events-view-table',
  standalone: true,
  imports: [DatePipe, MatCheckboxModule, MatPaginatorModule, MatSortModule, MatTableModule],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerEventsViewTableComponent extends AbstractUiDirective {
  readonly matSort = viewChild.required(MatSort);
  readonly matPaginator = viewChild.required(MatPaginator);

  readonly displayedColumns = ['select', 'type', 'date'];
  readonly dataSource = computed(() => {
    const dataSource = new MatTableDataSource(this.elements());
    dataSource.sort = this.matSort();
    dataSource.paginator = this.matPaginator();
    return dataSource;
  });
}
