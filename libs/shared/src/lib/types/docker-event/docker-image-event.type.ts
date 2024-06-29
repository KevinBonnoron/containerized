import { BaseDockerEvent } from './base-docker-event.type';

// export type DockerImageAction = 'delete' | 'import' | 'load' | 'pull' | 'push' | 'save' | 'tag' | 'untag';
interface DockerImageBaseEvent<A> extends BaseDockerEvent<'image'> {
  status: A;
  Action: A;
}

interface DockerImageDeleteEvent extends DockerImageBaseEvent<'delete'> {
  id: string;
  Actor: {
    ID: string;
    Attributes: {
      name: string;
    };
  };
}

interface DockerImagePullEvent extends DockerImageBaseEvent<'pull'> {
  id: string;
  Actor: {
    ID: string;
    Attributes: {
      name: string;
    };
  };
}

interface DockerImagePruneEvent extends DockerImageBaseEvent<'prune'> {
  Actor: {
    ID: string;
    Attributes: {
      reclaimed: string;
    };
  };
}

interface DockerImageUntagEvent extends DockerImageBaseEvent<'untag'> {
  id: string;
  Actor: {
    ID: string;
    Attributes: {
      name: string;
    };
  }
}

export type DockerImageEvent = DockerImageDeleteEvent | DockerImagePullEvent | DockerImagePruneEvent | DockerImageUntagEvent;