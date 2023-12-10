import { VolumeInspectInfo as DockerodeVolumeInspectInfo } from 'dockerode';

export interface ListImagesOptions {
  all: boolean;
  filters: {
    before: string[];
    dangling: true;
    label: string[];
    reference: string[];
    since: string[];
  }
}

export interface PullImageOptions {
  authconfig?: {
    username?: string;
    password?: string;
    auth?: string;
    email?: string;
    serveraddress: string;
    key?: string;
  }
}

export interface RunContainerOptions {
  name?: string;
}

export interface ListContainersOptions {
  all?: boolean;
  limit?: number;
  size?: boolean;
  filters?: {
    ancestor?: string[];
    before?: string[];
    expose?: string[];
    exited?: number[];
    health?: ('starting' | 'healthy' | 'unhealthy' | 'none')[];
    id?: string[];
    isolation?: ('default' | 'process' | 'hyperv')[];
    'is-task'?: ('true' | 'false')[];
    label?: string[];
    name?: string[];
    network?: string[];
    publish?: string[];
    since?: string[];
    status?: ('created' | 'restarting' | 'running' | 'removing' | 'paused' | 'exited' | 'dead')[];
    volume?: string[];
  };
}

export interface PruneImagesOptions {
  filters: {
    dangling: {
      false: boolean;
    };
  }
}

export interface PruneContainersOptions {
  dangling?: boolean;
}

export interface ListVolumesOptions {
  all: boolean;
}

// TODO this interface has wrong type in dockerode
export interface VolumeInspectInfo extends DockerodeVolumeInspectInfo {
  CreatedAt?: string;
}
