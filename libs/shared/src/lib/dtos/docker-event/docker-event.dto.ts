import { BuilderEventDto } from './docker-builder-event.dto';
import { ContainerEventDto } from './docker-container-event.dto';
import { ImageEventDto } from './docker-image-event.dto';
import { NetworkEventDto } from './docker-network-event.dto';
import { VolumeEventDto } from './docker-volume-event.dto';

export type DockerEventDto = ContainerEventDto | ImageEventDto | VolumeEventDto | NetworkEventDto | BuilderEventDto;
