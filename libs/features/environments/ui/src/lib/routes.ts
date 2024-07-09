import type { Routes } from '@angular/router';
import { environmentRouteResolver } from '@containerized/features/environments/data-access';
import { EnvironmentsCreateComponent, EnvironmentsEditComponent } from './components';

export const environmentRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'view',
        loadComponent: () => import('./components').then((m) => m.EnvironmentViewComponent),
        data: { title: 'environment.view.title' },
        children: [
          { path: 'create', loadComponent: () => import('./components').then((m) => m.EnvironmentsDialogComponent), data: { title: 'environment.create.title', dialogComponent: EnvironmentsCreateComponent } },
          { path: ':id', resolve: { environment: environmentRouteResolver }, children: [{ path: 'edit', loadComponent: () => import('./components').then((m) => m.EnvironmentsDialogComponent), data: { title: 'container.edit.title', dialogComponent: EnvironmentsEditComponent } }] },
        ],
      },
      { path: '', pathMatch: 'full', redirectTo: 'view' },
    ],
  },
];
