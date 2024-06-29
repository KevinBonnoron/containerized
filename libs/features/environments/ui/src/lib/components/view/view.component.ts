import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnvironmentsStore } from '@containerized/features/environments/data-access';
import { NgxDataLayoutWrapperComponent } from '@containerized/ui';
import { NgxDataLayoutComponent, provideDataLayout } from 'ngx-data-layout';
import { EnvironmentsViewCardsComponent } from './cards/cards.component';
import { EnvironmentsViewTableComponent } from './table/table.component';

@Component({
  selector: 'containerized-environment-view',
  standalone: true,
  imports: [NgxDataLayoutComponent, RouterOutlet],
  templateUrl: './view.component.html',
  providers: [
    provideDataLayout({
      wrapper: NgxDataLayoutWrapperComponent,
      components: [
        { component: EnvironmentsViewCardsComponent, name: 'cards' },
        { component: EnvironmentsViewTableComponent, name: 'table' },
      ]
    })
  ],
})
export class EnvironmentViewComponent {
  private readonly environmentsStore = inject(EnvironmentsStore);

  readonly environments = this.environmentsStore.entities;
}
