export interface DockerContainerPort {
  host: number;
  container: number;
  protocol: 'tcp' | 'udp' | string;
}

export type DockerContainerStatus =  'created' | 'running' | 'removing' | 'paused' | 'exited' | 'dead';

export interface DockerContainerDto {
  id: string;
  names: string[];
  image: string;
  created: Date;
  status: DockerContainerStatus;
  ports: DockerContainerPort[];
}

export type DockerContainerDtos = DockerContainerDto[];
