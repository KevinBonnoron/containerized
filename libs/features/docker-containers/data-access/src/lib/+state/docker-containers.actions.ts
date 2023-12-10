import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { DockerContainersEntity } from './docker-containers.models';

export const DockerContainersActions = createActionGroup({
  source: 'Docker Containers',
  events: {
    'Load': emptyProps(),
    'Load Success': props<{ dockerContainers: DockerContainersEntity[] }>(),
    'Load Failure': props<{ error: any }>(),

    'Create': props<{ dockerContainer: Omit<DockerContainersEntity, 'id' | 'created' | 'status'> }>(),
    'Create Success': props<{ dockerContainer: DockerContainersEntity }>(),
    'Create Failure': props<{ error: any }>(),

    'Start': props<{ id: DockerContainersEntity['id'] }>(),
    'Start Success': props<{ id: DockerContainersEntity['id'] }>(),
    'Start Failure': props<{ error: any }>(),

    'Restart': props<{ id: DockerContainersEntity['id'] }>(),
    'Restart Success': props<{ id: DockerContainersEntity['id'] }>(),
    'Restart Failure': props<{ error: any }>(),

    'Stop': props<{ id: DockerContainersEntity['id'] }>(),
    'Stop Success': props<{ id: DockerContainersEntity['id'] }>(),
    'Stop Failure': props<{ error: any }>(),

    'Delete': props<{ id: DockerContainersEntity['id'] }>(),
    'Delete Success': props<{ id: DockerContainersEntity['id'] }>(),
    'Delete Failure': props<{ error: any }>(),

    'Select Id': props<{ id: DockerContainersEntity['id'] }>(),
  }
});
