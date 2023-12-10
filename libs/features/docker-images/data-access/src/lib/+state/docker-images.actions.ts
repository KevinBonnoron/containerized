import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { DockerImagesEntity } from './docker-images.models';

export const DockerImagesActions = createActionGroup({
  source: 'Docker Images',
  events: {
    Load: emptyProps(),
    'Load Success': props<{ dockerImages: DockerImagesEntity[] }>(),
    'Load Failure': props<{ error: any }>(),
    Delete: emptyProps(),
    'Delete Success': props<{ dockerImage: DockerImagesEntity }>(),
    'Delete Failure': props<{ error: any }>(),
  }
})