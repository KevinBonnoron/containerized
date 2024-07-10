import { ChangeDetectionStrategy, Component, computed, viewChild } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ConfirmButtonComponent } from '@containerized/ui';
import { AngularRemixIconComponent } from 'angular-remix-icon';
import { AbstractUiDirective } from '../../../directives';

@Component({
  selector: 'containerized-docker-networks-networks-table',
  standalone: true,
  imports: [AngularRemixIconComponent, ConfirmButtonComponent, MatCheckboxModule, MatChipsModule, MatPaginatorModule, MatSortModule, MatTableModule],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerNetworksTableComponent extends AbstractUiDirective {
  readonly matSort = viewChild.required(MatSort);
  readonly matPaginator = viewChild.required(MatPaginator);

  readonly displayedColumns = ['select', 'name', 'scope', 'driver', 'enableIPv6', 'actions'];
  readonly dataSource = computed(() => {
    const dataSource = new MatTableDataSource(this.elements());
    dataSource.sort = this.matSort();
    dataSource.paginator = this.matPaginator();
    return dataSource;
  });
}
