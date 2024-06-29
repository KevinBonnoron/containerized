import { DatePipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, viewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AbstractUiDirective } from '../../../directives';

@Component({
  selector: 'containerized-docker-containers-view-table',
  standalone: true,
  imports: [DatePipe, MatCheckboxModule, MatChipsModule, MatPaginatorModule, MatSortModule, MatTableModule, NgStyle],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerContainersViewTableComponent extends AbstractUiDirective {
  readonly matSort = viewChild.required(MatSort);
  readonly matPaginator = viewChild.required(MatPaginator);

  readonly displayedColumns = ['select', 'id', 'name', 'status', 'created'];
  readonly dataSource = computed(() => {
    const dataSource = new MatTableDataSource(this.elements());
    dataSource.sort = this.matSort();
    dataSource.paginator = this.matPaginator();
    return dataSource;
  });
}
