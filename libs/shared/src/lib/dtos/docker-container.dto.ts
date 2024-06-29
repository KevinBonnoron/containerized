export interface DockerContainerPort {
  ip?: string;
  host?: number;
  container: number;
  protocol: 'tcp' | 'udp' | string;
}

interface AbstractDockerContainerVolume {
  destination: string;
  driver?: string;
  mode: 'z' | '';
  rw: boolean;
  propgation: '' | 'rprivate';
}

export interface DockerContainerNamedVolume extends AbstractDockerContainerVolume {
  type: 'named';
  name: string;
}

export interface DockerContainerBindVolume extends AbstractDockerContainerVolume {
  type: 'bind';
  source: string;
}

export type DockerContainerVolume = DockerContainerNamedVolume | DockerContainerBindVolume;

export interface DockerContainerEnvironment {
  key: string;
  value: string;
}

export interface DockerContainerLabel {
  key: string;
  value: string;
}

type DockerContainerStatusExtra = 'starting' | 'stopping';
export type DockerContainerStatus =  'created' | 'restarting' | 'running' | 'removing' | 'paused' | 'exited' | 'dead' | DockerContainerStatusExtra;

export interface DockerContainerDto {
  id: string;
  name: string;
  image: string;
  created: Date;
  status: DockerContainerStatus;
  labels: DockerContainerLabel[];
  ports: DockerContainerPort[];
  volumes: DockerContainerVolume[];
  environments: DockerContainerEnvironment[];
}

export type DockerContainerDtos = DockerContainerDto[];
