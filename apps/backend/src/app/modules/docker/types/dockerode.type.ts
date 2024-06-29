import type { VolumeListOptions } from 'dockerode';
import { type VolumeInspectInfo as DockerodeVolumeInspectInfo } from 'dockerode';

import type { DockerContainerStatus, DockerContainerVolume } from '@containerized/shared';

export interface ListImagesOptions {
  all: boolean;
  filters: {
    before?: string[];
    dangling?: true;
    label?: string[];
    reference?: string[];
    since?: string[];
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
  volumes?: DockerContainerVolume[];
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
    status?: DockerContainerStatus[];
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

export interface ListVolumesOptions extends VolumeListOptions {
  all?: boolean;
}

export interface VolumePruneOptions {
  filters?: {
    label?: string[];
  }
}

export interface Mount {
  Name?: string | undefined;
  Type: 'volume' | 'bind';
  Source: string;
  Destination: string;
  Driver?: string | undefined;
  Mode: '' | 'z';
  RW: boolean;
  Propagation: '' | 'rprivate';
}

// TODO this interface has wrong type in dockerode
export interface VolumeInspectInfo extends DockerodeVolumeInspectInfo {
  CreatedAt?: string;
}

export interface SystemInfo {
  ID: string;
  Containers: number;
  ContainersRunning: number,
  ContainersPaused: number,
  ContainersStopped: number,
  Images: number,
  Driver: string,
  DriverStatus: string[][],
  DockerRootDir: string,
  SystemStatus: any[][],
  Plugins: {
    Volume: string[] | null,
    Network: string[] | null,
    Authorization: string[] | null,
    Log: string[] | null,
  },
  MemoryLimit: boolean,
  SwapLimit: boolean,
  KernelMemory: boolean,
  CpuCfsPeriod: boolean,
  CpuCfsQuota: boolean,
  CPUShares: boolean,
  CPUSet: boolean,
  OomKillDisable: boolean,
  IPv4Forwarding: boolean,
  BridgeNfIptables: boolean,
  BridgeNfIp6tables: boolean,
  Debug: boolean,
  NFd: number,
  NGoroutines: number,
  SystemTime: string,
  LoggingDriver: string,
  CgroupDriver: string,
  NEventsListener: number,
  KernelVersion: string,
  OperatingSystem: string,
  OSType: string,
  Architecture: string,
  NCPU: number,
  MemTotal: number,
  IndexServerAddress: string,
  RegistryConfig: {
    AllowNondistributableArtifactsCIDRs: any[] | null,
    AllowNondistributableArtifactsHostnames: any[] | null,
    InsecureRegistryCIDRs: string[],
    IndexConfigs: Record<string, { Name: string; Mirrors: any[]; Secure: boolean; Official: boolean }>,
    Mirrors: any[] | null
  },
  GenericResources: any[] | null,
  HttpProxy: string,
  HttpsProxy: string,
  NoProxy: string,
  Name: string,
  Labels: string[],
  ExperimentalBuild: boolean,
  ServerVersion: string,
  ClusterStore: string,
  ClusterAdvertise: string,
  Runtimes: Record<string, { path: string, status: Record<string, string> }>,
  DefaultRuntime: string,
  Swarm: {
    NodeID: string,
    NodeAddr: string,
    LocalNodeState: string,
    ControlAvailable: boolean,
    Error: string,
    RemoteManagers: any[] | null,
    Nodes?: number,
    Managers?: number,
    Cluster?: {}
  },
  LiveRestoreEnabled: boolean,
  Isolation: string,
  InitBinary: string,
  ContainerdCommit: {
    ID: string,
    Expected: string
  },
  RuncCommit: {
    ID: string,
    Expected: string
  },
  InitCommit: {
    ID: string,
    Expected: string
  },
  SecurityOptions: string[]
}

export interface SystemPing {
  type: 'Buffer';
  data: number[];
}
