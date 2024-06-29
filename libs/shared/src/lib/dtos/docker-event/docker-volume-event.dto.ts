import { BaseEventDto } from './docker-base-event.dto';

type VolumeBaseEventDto = BaseEventDto<'volume'>;

interface VolumeCreateEventDto extends VolumeBaseEventDto {
  action: 'create';
  name: string;
  driver: string;
}

interface VolumeMountEventDto extends VolumeBaseEventDto {
  action: 'mount';
  container: string;
  destination: string;
  driver: string;
  propagation: string;
  rw: boolean;
}

interface VolumeUnmountEventDto extends VolumeBaseEventDto {
  action: 'unmount';
  container: string;
  driver: string;
}

interface VolumeDestroyEventDto extends VolumeBaseEventDto {
  action: 'destroy';
  name: string;
  driver: string;
}

interface VolumePruneEventDto extends VolumeBaseEventDto {
  action: 'prune';
  reclaimed: number;
}

export type VolumeEventDto = VolumeCreateEventDto | VolumeMountEventDto | VolumeUnmountEventDto | VolumeDestroyEventDto | VolumePruneEventDto;
