import { BaseDockerEvent } from './base-docker-event.type';

type DockerBuilderBaseEvent = BaseDockerEvent<'builder'>;

interface DockerBuilderPruneEvent extends DockerBuilderBaseEvent {
  Action: 'prune';
  Actor: {
    ID: '';
    Attributes: {
      reclaimed: string;
    };
  };
}

export type DockerBuilderEvent = DockerBuilderPruneEvent;
