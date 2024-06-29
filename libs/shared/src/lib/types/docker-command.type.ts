interface Device {
  source: string;
  target: string;
}

type ReadWriteOptions = 'rw' | 'ro';
type ZOptions = 'z' | 'Z';

interface Volume {
  type: 'named' | 'bind';
  host: string;
  container: string;
  options?: [ReadWriteOptions] | [ZOptions] | [ReadWriteOptions, ZOptions] | [ZOptions, ReadWriteOptions]; // TODO find a better type
}

interface Publish {
  ip?: string;
  host?: number;
  container: number;
  protocol: 'tcp' | 'udp' | string;
}

interface RestartPolicy {
  mode: string;
  count?: number;
}

type Capability =
  'CAP_AUDIT_CONTROL' |
  'CAP_AUDIT_READ' |
  'CAP_AUDIT_WRITE' |
  'CAP_BLOCK_SUSPEND' |
  'CAP_BPF' |
  'CAP_CHECKPOINT_RESTORE' |
  'CAP_CHOWN' |
  'CAP_DAC_OVERRIDE' |
  'CAP_DAC_READ_SEARCH' |
  'CAP_FOWNER' |
  'CAP_FSETID' |
  'CAP_IPC_LOCK' |
  'CAP_IPC_OWNER' |
  'CAP_KILL' |
  'CAP_LEASE' |
  'CAP_LINUX_IMMUTABLE' |
  'CAP_MAC_ADMIN' |
  'CAP_MAC_OVERRIDE' |
  'CAP_MKNOD' |
  'CAP_NET_ADMIN' |
  'CAP_NET_BIND_SERVICE' |
  'CAP_NET_BROADCAST' |
  'CAP_NET_RAW' |
  'CAP_PERFMON' |
  'CAP_SETGID' |
  'CAP_SETFCAP' |
  'CAP_SETPCAP' |
  'CAP_SETUID' |
  'CAP_SYS_ADMIN' |
  'CAP_SYS_BOOT' |
  'CAP_SYS_CHROOT' |
  'CAP_SYS_MODULE' |
  'CAP_SYS_NICE' |
  'CAP_SYS_PACCT' |
  'CAP_SYS_PTRACE' |
  'CAP_SYS_RAWIO' |
  'CAP_SYS_RESOURCE' |
  'CAP_SYS_TIME' |
  'CAP_SYS_TTY_CONFIG' |
  'CAP_SYSLOG' |
  'CAP_WAKE_ALARM'
;

export interface DockerRunOptions {
  addedCapabilities: Capability[];
  droppedCapabilities: Capability[];
  detached: boolean;
  devices: Device[];
  environments: Record<string, string>;
  labels: Record<string, string>;
  name: string;
  network: string;
  privileged: boolean;
  publish: Publish[];
  restartPolicy: RestartPolicy;
  securityOptions: Record<string, string>;
  shmSize: string;
  volumes: Volume[];
  remove: boolean;
}

export interface DockerRunCommand {
  type: 'run';
  image: string;
  tag: string;
  options: Partial<DockerRunOptions>;
}

export interface DockerPullCommand {
  type: 'pull';
  image: string;
  tag: string;
}

export type DockerCommand = DockerRunCommand | DockerPullCommand;
