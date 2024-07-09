import type { Routes } from '@angular/router';

import { dockerVolumeRouteResolver, provideDockerVolumes } from '@containerized/features/docker-volumes/data-access';
import { DockerVolumesCreateComponent, DockerVolumesEditComponent } from './components';

const providers = [provideDockerVolumes()];

export const dockerVolumesRoutes: Routes = [
  {
    path: '',
    providers,
    children: [
      {
        path: 'view',
        loadComponent: () => import('./components').then((m) => m.DockerVolumesViewComponent),
        children: [
          { path: 'create', loadComponent: () => import('./components').then((m) => m.DockerVolumesDialogComponent), data: { title: 'volume.create.title', dialogComponent: DockerVolumesCreateComponent } },
          {
            path: ':id',
            resolve: { dockerVolume: dockerVolumeRouteResolver },
            children: [{ path: 'edit', loadComponent: () => import('./components').then((m) => m.DockerVolumesDialogComponent), data: { title: 'container.edit.title', dialogComponent: DockerVolumesEditComponent } }],
          },
        ],
      },
      { path: '', pathMatch: 'full', redirectTo: 'view' },
    ],
  },
];
