import { BaseDockerEvent } from './base-docker-event.type';

type DockerNetworkBaseEvent = BaseDockerEvent<'network'>;

interface DockerNetworkCreateEvent extends DockerNetworkBaseEvent {
  Action: 'create';
  Actor: {
    ID: string;
    Attributes: {
      name: string;
      type: string;
    }
  };
}

interface DockerNetworkDestroyEvent extends DockerNetworkBaseEvent {
  Action: 'destroy';
  Actor: {
    ID: string;
    Attributes: {
      name: string;
      type: string;
    }
  };
}

interface DockerNetworkConnectEvent extends DockerNetworkBaseEvent {
  Action: 'connect';
  Actor: {
    ID: string;
    Attributes: {
      container: string;
      name: string;
      type: 'bridge'; // TODO
    }
  };
}

interface DockerNetworkDisconnectEvent extends DockerNetworkBaseEvent {
  Action: 'disconnect';
  Actor: {
    ID: string;
    Attributes: {
      container: string;
      name: string;
      type: 'bridge'; // TODO
    }
  }
}

interface DockerNetworkPruneEvent extends DockerNetworkBaseEvent {
  Action: 'prune',
  Actor: {
    ID: string;
    Attributes: {
      reclaimed: string
    };
  };
}

export type DockerNetworkEvent = DockerNetworkCreateEvent | DockerNetworkDestroyEvent | DockerNetworkConnectEvent | DockerNetworkDisconnectEvent | DockerNetworkPruneEvent;
