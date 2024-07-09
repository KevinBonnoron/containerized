import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistriesStore } from '@containerized/features/registries/data-access';
import { NgxDataLayoutWrapperComponent } from '@containerized/ui';
import { NgxDataLayoutComponent, provideDataLayout } from 'ngx-data-layout';
import { RegistriesViewCardsComponent } from './cards/cards.component';
import { RegistriesViewTableComponent } from './table/table.component';

@Component({
  selector: 'containerized-registry-view',
  standalone: true,
  imports: [NgxDataLayoutComponent, RouterOutlet],
  templateUrl: './view.component.html',
  providers: [
    provideDataLayout({
      wrapper: NgxDataLayoutWrapperComponent,
      components: [
        { component: RegistriesViewCardsComponent, name: 'cards' },
        { component: RegistriesViewTableComponent, name: 'table' },
      ],
    }),
  ],
})
export class EnvironmentViewComponent {
  private readonly registriesStore = inject(RegistriesStore);

  readonly registries = this.registriesStore.entities;
}
