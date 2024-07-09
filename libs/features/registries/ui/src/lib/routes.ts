import type { Routes } from '@angular/router';
import { provideRegistries, registriesLoadedGuard, registryRouteResolver } from '@containerized/features/registries/data-access';
import { RegistriesCreateComponent, RegistriesEditComponent } from './components';

const providers = [provideRegistries()];

const canActivate = [registriesLoadedGuard];

export const registryRoutes: Routes = [
  {
    path: '',
    providers,
    canActivate,
    children: [
      {
        path: 'view',
        loadComponent: () => import('./components').then((m) => m.EnvironmentViewComponent),
        data: { title: 'registry.view.title' },
        children: [
          {
            path: 'create',
            loadComponent: () => import('./components').then((m) => m.RegistriesDialogComponent),
            data: {
              title: 'registry.create.title',
              dialogComponent: RegistriesCreateComponent,
            },
          },
          {
            path: ':id',
            resolve: { registry: registryRouteResolver },
            children: [
              {
                path: 'edit',
                loadComponent: () => import('./components').then((m) => m.RegistriesDialogComponent),
                data: {
                  title: 'container.edit.title',
                  dialogComponent: RegistriesEditComponent,
                },
              },
            ],
          },
        ],
      },
      { path: '', pathMatch: 'full', redirectTo: 'view' },
    ],
  },
];
