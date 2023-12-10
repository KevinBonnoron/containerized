import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { DockerVolumesEntity } from './docker-volumes.models';

export const DockerVolumesActions = createActionGroup({
  source: 'Docker Volumes',
  events: {
    Load: emptyProps(),
    'Load Success': props<{ dockerVolumes: DockerVolumesEntity[] }>(),
    'Load Failure': props<{ error: any }>(),
  },
});
