import { BaseDockerEvent } from './base-docker-event.type';

// export type DockerVolumeAction = 'create' | 'mount' | 'unmount' | 'destroy';
type DockerVolumeBaseEvent = BaseDockerEvent<'volume'>;

interface DockerVolumeCreateEvent extends DockerVolumeBaseEvent {
  Action: 'create';
  Actor: {
    ID: string;
    Attributes: {
      driver: string;
    };
  };
}

interface DockerVolumeMountEvent extends DockerVolumeBaseEvent {
  Action: 'mount';
  Actor: {
    ID: string;
    Attributes: {
      container: string;
      destination: string;
      driver: string;
      propagation: string;
      'read/write': 'true' | 'false';
    };
  };
}

interface DockerVolumeUnmount extends DockerVolumeBaseEvent {
  Action: 'unmount';
  Actor: {
    ID: string;
    Attributes: {
      container: string;
      driver: 'local'; // TODO
    };
  };
}

interface DockerVolumeDestroyEvent extends DockerVolumeBaseEvent {
  Action: 'destroy';
  Actor: {
    ID: string;
    Attributes: {
      driver: string;
    };
  };
}

interface DockerVolumePruneEvent extends DockerVolumeBaseEvent {
  Action: 'prune';
  Actor: {
    ID: string;
    Attributes: {
      reclaimed: string;
    };
  };
}

export type DockerVolumeEvent = DockerVolumeCreateEvent | DockerVolumeMountEvent | DockerVolumeUnmount | DockerVolumeDestroyEvent | DockerVolumePruneEvent;
