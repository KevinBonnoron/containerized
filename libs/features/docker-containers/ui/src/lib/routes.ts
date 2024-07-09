import type { Routes } from '@angular/router';
import { dockerContainerRouteResolver, dockerContainersLoadedGuard, provideDockerContainers } from '@containerized/features/docker-containers/data-access';
import { provideDockerVolumes } from '@containerized/features/docker-volumes/data-access';
import { provideChildTranslate } from '@containerized/ui';
import * as en from '../assets/i18n/en.json';
import * as fr from '../assets/i18n/fr.json';
import { DockerContainersCreateComponent, DockerContainersEditComponent, DockerContainersExecComponent, DockerContainersLogComponent } from './components';

const providers = [provideDockerVolumes(), provideDockerContainers(), provideChildTranslate({ fr, en })];

const canActivate = [dockerContainersLoadedGuard];

export const dockerContainersRoutes: Routes = [
  {
    path: '',
    providers,
    canActivate,
    children: [
      {
        path: 'view',
        loadComponent: () => import('./components').then((m) => m.DockerContainersViewComponent),
        data: { title: 'container.view.title' },
        children: [
          { path: 'create', loadComponent: () => import('./components').then((m) => m.DockerContainersDialogComponent), data: { title: 'container.create.title', dialogComponent: DockerContainersCreateComponent } },
          {
            path: ':id',
            resolve: { dockerContainer: dockerContainerRouteResolver },
            children: [
              { path: 'log', loadComponent: () => import('./components').then((m) => m.DockerContainersDialogComponent), data: { title: 'container.log.title', dialogComponent: DockerContainersLogComponent } },
              { path: 'edit', loadComponent: () => import('./components').then((m) => m.DockerContainersDialogComponent), data: { title: 'container.edit.title', dialogComponent: DockerContainersEditComponent } },
              { path: 'exec', loadComponent: () => import('./components').then((m) => m.DockerContainersDialogComponent), data: { title: 'container.exec.title', dialogComponent: DockerContainersExecComponent } },
            ],
          },
        ],
      },
      { path: '', pathMatch: 'full', redirectTo: 'view' },
    ],
  },
];
