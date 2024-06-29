import { BaseEventDto } from './docker-base-event.dto';

type ContainerBaseEventDto = BaseEventDto<'container'>;

interface ContainerCreateEventDto extends ContainerBaseEventDto {
  action: 'create';
  id: string;
  from: string;
  image: string;
  name: string;
}

interface ContainerStartEventDto extends ContainerBaseEventDto {
  action: 'start';
  id: string;
  from: string;
  image: string;
  name: string;
}

interface ContainerPruneEventDto extends ContainerBaseEventDto {
  action: 'prune';
  reclaimed: number;
}

interface ContainerDestroyEventDto extends ContainerBaseEventDto {
  action: 'destroy';
  id: string;
  from: string;
  image: string;
  name: string;
}

interface ContainerAttachEventDto extends ContainerBaseEventDto {
  action: 'attach';
  id: string;
  from: string;
  image: string;
  name: string;
}

interface ContainerDieEventDto extends ContainerBaseEventDto {
  action: 'die';
  id: string;
  from: string;
  execDuration: string;
  exitCode: string;
  image: string;
  name: string;
}

interface ContainerKillEventDto extends ContainerBaseEventDto {
  action: 'kill';
  id: string;
  from: string;
  image: string;
  name: string;
  signal: string;
}

interface ContainerStopEventDto extends ContainerBaseEventDto {
  action: 'stop';
  id: string;
  from: string;
  image: string;
  name: string;
}

interface ContainerExecDieEvent extends ContainerBaseEventDto {
  action: 'exec_die';
  id: string;
  from: string;
  execID: string;
  exitCode: string;
  image: string;
  name: string;
}

export type ContainerEventDto = ContainerCreateEventDto | ContainerStartEventDto | ContainerPruneEventDto | ContainerDestroyEventDto | ContainerAttachEventDto | ContainerDieEventDto | ContainerKillEventDto | ContainerStopEventDto | ContainerExecDieEvent;
