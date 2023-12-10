import { DockerEventDto } from '@containerized/shared';

interface BaseEvent {
  Actor: {
    ID: string;
    Attributes: Record<string, string>;
  };
  scope: 'local' | 'global';
  time: number;
  timeNano: number;
}

type ImageEventActions = 'pull'| 'prune';
interface ImageEvent extends BaseEvent {
  status: ImageEventActions;
  id: string;
  Type: 'image';
  Action: ImageEventActions;
}

type ContainerEventActions = 'create' | 'attach' | 'start' | 'kill' | 'die' | 'destroy' | 'prune' | 'update';
interface ContainerEvent extends BaseEvent {
  status: ContainerEventActions;
  id: string;
  from: string;
  Type: 'container';
  Action: ContainerEventActions;
}

interface VolumeEvent extends BaseEvent {
  Type: 'volume';
  Action: 'create' | 'destroy';
}

interface NetworkEvent extends BaseEvent {
  Type: 'network';
  Action: 'create' | 'destroy' | 'connect' | 'disconnect' | 'prune';
}

interface BuilderEvent extends BaseEvent {
  Type: 'builder';
  Action: 'prune';
}

type EventInfo = ImageEvent | ContainerEvent | VolumeEvent | NetworkEvent | BuilderEvent;

export const DockerEventsAdapter = {
  toDto(eventInfo: EventInfo): DockerEventDto {
    const baseEventDto = {
      actor: {
        id: eventInfo.Actor.ID,
        attributes: eventInfo.Actor.Attributes,
      },
      scope: eventInfo.scope,
      date: new Date(eventInfo.time)
    };

    switch (eventInfo.Type) {
      case 'image':
        return {
          type: 'image',
          action: eventInfo.Action,
          id: eventInfo.id,
          ...baseEventDto
        };

      case 'container':
        return {
          type: 'container',
          action: eventInfo.Action,
          id: eventInfo.id,
          from: eventInfo.from,
          ...baseEventDto
        };

      case 'volume':
        return {
          type: 'volume',
          action: eventInfo.Action,
          ...baseEventDto
        };

      case 'network':
        return {
          type: 'network',
          action: eventInfo.Action,
          ...baseEventDto,
        };

      case 'builder':
        return {
          type: 'builder',
          action: eventInfo.Action,
          ...baseEventDto
        }

      default:
        console.log('UNPROCESSEABLE EVENT', eventInfo);
    }
  }
}