import type { BuilderEventDto, ContainerEventDto, DockerBuilderEvent, DockerContainerEvent, DockerEventDto, DockerImageEvent, DockerNetworkEvent, DockerVolumeEvent, EventInfo, ImageEventDto, NetworkEventDto, VolumeEventDto } from '@containerized/shared';

const DockerImageEventsAdapter = {
  toDto(dockerImageEvent: DockerImageEvent): ImageEventDto {
    const baseEventDto = {
      type: dockerImageEvent.Type,
      date: new Date(dockerImageEvent.time * 1000),
    } as const;

    switch (dockerImageEvent.Action) {
      case 'pull':
      case 'delete':
      case 'untag':
        return {
          ...baseEventDto,
          action: dockerImageEvent.Action,
          id: dockerImageEvent.id,
          name: dockerImageEvent.Actor.Attributes.name,
        };

      case 'prune':
        return {
          ...baseEventDto,
          action: dockerImageEvent.Action,
          reclaimed: parseInt(dockerImageEvent.Actor.Attributes.reclaimed),
        };

      default:
        console.log('UNPROCESSEABLE EVENT', dockerImageEvent);
    }
  }
}

const DockerContainerEventsAdapter = {
  toDto(dockerContainerEvent: DockerContainerEvent): ContainerEventDto {
    const baseEventDto = {
      type: dockerContainerEvent.Type,
      date: new Date(dockerContainerEvent.time * 1000),
    } as const;

    switch (dockerContainerEvent.Action) {
      case 'create':
      case 'start':
      case 'stop':
      case 'attach':
      case 'destroy':
        return {
          ...baseEventDto,
          action: dockerContainerEvent.Action,
          id: dockerContainerEvent.id,
          from: dockerContainerEvent.from,
          image: dockerContainerEvent.Actor.Attributes.image,
          name: dockerContainerEvent.Actor.Attributes.name,
        };

      case 'exec_die':
        return {
          ...baseEventDto,
          action: dockerContainerEvent.Action,
          id: dockerContainerEvent.id,
          from: dockerContainerEvent.from,
          execID: dockerContainerEvent.Actor.Attributes.execID,
          exitCode: dockerContainerEvent.Actor.Attributes.exitCode,
          image: dockerContainerEvent.Actor.Attributes.image,
          name: dockerContainerEvent.Actor.Attributes.name,
        };

      case 'die':
        return {
          ...baseEventDto,
          action: dockerContainerEvent.Action,
          id: dockerContainerEvent.id,
          from: dockerContainerEvent.from,
          execDuration: dockerContainerEvent.Actor.Attributes.execDuration,
          exitCode: dockerContainerEvent.Actor.Attributes.exitCode,
          image: dockerContainerEvent.Actor.Attributes.image,
          name: dockerContainerEvent.Actor.Attributes.name,
        };

      case 'kill':
        return {
          ...baseEventDto,
          action: dockerContainerEvent.Action,
          id: dockerContainerEvent.id,
          from: dockerContainerEvent.from,
          image: dockerContainerEvent.Actor.Attributes.image,
          name: dockerContainerEvent.Actor.Attributes.name,
          signal: dockerContainerEvent.Actor.Attributes.signal,
        };

      case 'prune':
        return {
          ...baseEventDto,
          action: dockerContainerEvent.Action,
          reclaimed: parseInt(dockerContainerEvent.Actor.Attributes.reclaimed),
        };

      default:
        console.log('UNPROCESSEABLE EVENT', dockerContainerEvent);
    }
  }
}

const DockerVolumeEventsAdapter = {
  toDto(dockerVolumeEvent: DockerVolumeEvent): VolumeEventDto {
    const baseEventDto = {
      type: dockerVolumeEvent.Type,
      date: new Date(dockerVolumeEvent.time * 1000),
    } as const;

    switch (dockerVolumeEvent.Action) {
      case 'create':
      case 'destroy':
        return {
          ...baseEventDto,
          name: dockerVolumeEvent.Actor.ID,
          action: dockerVolumeEvent.Action,
          driver: dockerVolumeEvent.Actor.Attributes.driver,
        }

      case 'mount':
        return {
          ...baseEventDto,
          action: dockerVolumeEvent.Action,
          container: dockerVolumeEvent.Actor.Attributes.container,
          destination: dockerVolumeEvent.Actor.Attributes.destination,
          driver: dockerVolumeEvent.Actor.Attributes.driver,
          propagation: dockerVolumeEvent.Actor.Attributes.propagation,
          rw: dockerVolumeEvent.Actor.Attributes['read/write'] === 'true',
        };

      case 'unmount':
        return {
          ...baseEventDto,
          action: dockerVolumeEvent.Action,
          container: dockerVolumeEvent.Actor.Attributes.container,
          driver: dockerVolumeEvent.Actor.Attributes.driver,
        };

      case 'prune':
        return {
          ...baseEventDto,
          action: dockerVolumeEvent.Action,
          reclaimed: parseInt(dockerVolumeEvent.Actor.Attributes.reclaimed),
        }

      default:
        console.log('UNPROCESSEABLE EVENT', dockerVolumeEvent);
    }
  }
}

const DockerNetworkEventsAdapter = {
  toDto(dockerNetworkEvent: DockerNetworkEvent): NetworkEventDto {
    const baseEventDto = {
      id: dockerNetworkEvent.Actor.ID,
      type: dockerNetworkEvent.Type,
      date: new Date(dockerNetworkEvent.time * 1000),
    } as const;

    switch (dockerNetworkEvent.Action) {
      case 'create':
      case 'destroy':
        return {
          ...baseEventDto,
          action: dockerNetworkEvent.Action,
          name: dockerNetworkEvent.Actor.Attributes.name,
          driver: dockerNetworkEvent.Actor.Attributes.type,
        };

      case 'connect':
      case 'disconnect':
        return {
          ...baseEventDto,
          action: dockerNetworkEvent.Action,
          container: dockerNetworkEvent.Actor.Attributes.container,
          name: dockerNetworkEvent.Actor.Attributes.name,
          driver: dockerNetworkEvent.Actor.Attributes.type,
        };

      case 'prune':
        return {
          ...baseEventDto,
          action: dockerNetworkEvent.Action,
          reclaimed: parseInt(dockerNetworkEvent.Actor.Attributes.reclaimed),
        };

      default:
        console.log('UNPROCESSEABLE EVENT', dockerNetworkEvent);
    }
  }
}

const DockerBuilderEventsAdapter = {
  toDto(dockerBuilderEvent: DockerBuilderEvent): BuilderEventDto {
    const baseEventDto = {
      type: dockerBuilderEvent.Type,
      date: new Date(dockerBuilderEvent.time * 1000),
    } as const;

    switch (dockerBuilderEvent.Action) {
      case 'prune':
        return {
          ...baseEventDto,
          action: dockerBuilderEvent.Action,
          reclaimed: parseInt(dockerBuilderEvent.Actor.Attributes.reclaimed),
        };

      default:
        console.log('UNPROCESSEABLE EVENT', dockerBuilderEvent);
    }
  }
}

export const DockerEventsAdapter = {
  toDto(eventInfo: EventInfo): DockerEventDto {
    switch (eventInfo.Type) {
      case 'image':
        return DockerImageEventsAdapter.toDto(eventInfo);

      case 'container':
        return DockerContainerEventsAdapter.toDto(eventInfo);

      case 'volume':
        return DockerVolumeEventsAdapter.toDto(eventInfo);

      case 'network':
        return DockerNetworkEventsAdapter.toDto(eventInfo);

      case 'builder':
        return DockerBuilderEventsAdapter.toDto(eventInfo);

      default:
        console.log('UNPROCESSEABLE EVENT', eventInfo);
    }
  }
}
