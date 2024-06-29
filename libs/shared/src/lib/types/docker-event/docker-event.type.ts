
// export type DockerPluginAction = 'enable' | 'disable' | 'install' | 'remove';
// export type DockerDaemonAction = 'reload';
// export type DockerServiceAction = 'create' | 'remove' | 'update';
// export type DockerNodeAction = 'create' | 'remove' | 'update';
// export type DockerSecretAction = 'create' | 'remove' | 'update';
// export type DockerConfigAction = 'create' | 'remove' | 'update';

import { DockerBuilderEvent } from './docker-builder-event.type';
import { DockerContainerEvent } from './docker-container-event.type';
import { DockerImageEvent } from './docker-image-event.type';
import { DockerNetworkEvent } from './docker-network-event.type';
import { DockerVolumeEvent } from './docker-volume-event.type';

export type EventInfo =
  | DockerImageEvent
  | DockerContainerEvent
  // | PluginEvent
  | DockerVolumeEvent
  | DockerNetworkEvent
  // | DaemonEvent
  // | ServiceEvent
  // | NodeEvent
  // | SecretEvent
  // | ConfigEvent
  | DockerBuilderEvent
  // | PluginEvent
  ;
