export interface DockerEvent {
  actor: {
    id: string;
    attributes: Record<string, string>;
  };
  scope: 'local' | 'global';
  date: Date;
}

export interface DockerContainerEvent extends DockerEvent {
  type: 'container';
  action: 'create' | 'attach' | 'start' | 'kill' | 'die' | 'destroy' | 'prune' | 'update';
  id: string;
  from: string;
}

export interface DockerImageEvent extends DockerEvent {
  type: 'image';
  action: 'pull' | 'prune';
  id: string;
}

export interface DockerVolumeEvent extends DockerEvent {
  type: 'volume';
  action: 'create' | 'destroy';
}

export interface DockerNetworkEvent extends DockerEvent {
  type: 'network';
  action: 'create' | 'destroy' | 'connect' | 'disconnect' | 'prune';
}

export interface DockerBuilderEvent extends DockerEvent {
  type: 'builder';
  action: 'prune';
}

export type DockerEventDto = DockerImageEvent | DockerContainerEvent | DockerVolumeEvent | DockerNetworkEvent | DockerBuilderEvent;
