import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AngularRemixIconComponent } from 'angular-remix-icon';
import { DataLayoutStore, NgxDataLayoutContentComponent } from 'ngx-data-layout';

@Component({
  selector: 'containerized-ngx-data-layout-wrapper',
  standalone: true,
  imports: [AngularRemixIconComponent, MatButtonModule, NgxDataLayoutContentComponent, RouterLink],
  templateUrl: './ngx-data-layout-wrapper.component.html',
})
export class NgxDataLayoutWrapperComponent {
  private readonly dataLayoutStore = inject(DataLayoutStore);

  readonly currentLayout = this.dataLayoutStore.currentLayout;

  setLayout(layout: string) {
    this.dataLayoutStore.setLayout(layout);
  }
}
