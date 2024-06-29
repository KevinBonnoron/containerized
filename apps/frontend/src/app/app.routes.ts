import type { Route } from '@angular/router';

import { titleResolver } from '@containerized/ui';

const title = titleResolver;

export const appRoutes: Route[] = [
  { path: '', title, runGuardsAndResolvers: 'always', loadChildren: () => import('@containerized/features/shell/ui').then((m) => m.routes)},
];
