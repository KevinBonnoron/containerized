import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink } from '@angular/router';
import { notEmpty } from '@containerized/utils';
import { AngularRemixIconComponent } from 'angular-remix-icon';
import { valuesOf } from 'monadojs';
import { DataLayoutStore, NgxDataLayoutContentComponent } from 'ngx-data-layout';

@Component({
  selector: 'containerized-ngx-data-layout-wrapper',
  standalone: true,
  imports: [AngularRemixIconComponent, MatBadgeModule, MatButtonModule, MatSidenavModule, NgxDataLayoutContentComponent, RouterLink],
  templateUrl: './ngx-data-layout-wrapper.component.html',
  styleUrl: './ngx-data-layout-wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxDataLayoutWrapperComponent {
  private readonly dataLayoutStore = inject(DataLayoutStore);

  readonly layout = this.dataLayoutStore.layout;
  readonly filtersCount = computed(() => [...valuesOf(this.dataLayoutStore.filters())].filter(notEmpty).length);

  setLayout(layout: string) {
    this.dataLayoutStore.setLayout(layout);
  }
}
