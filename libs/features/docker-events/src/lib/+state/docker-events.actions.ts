import { createActionGroup } from '@ngrx/store';

export const DockerEventsActions = createActionGroup({
  source: 'Docker Events',
  events: {}
});
