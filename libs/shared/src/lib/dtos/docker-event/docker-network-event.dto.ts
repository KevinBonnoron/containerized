import { BaseEventDto } from './docker-base-event.dto';

interface NetworkBaseEventDto extends BaseEventDto<'network'> {
  id: string;
}

interface NetworkCreateEventDto extends NetworkBaseEventDto {
  action: 'create';
  name: string;
  driver: string;
}

interface NetworkDestroyEventDto extends NetworkBaseEventDto {
  action: 'destroy';
  name: string;
  driver: string;
}

interface NetworkConnectEventDto extends NetworkBaseEventDto {
  action: 'connect';
  container: string;
  name: string;
  driver: string;
}

interface NetworkDisconnectEventDto extends NetworkBaseEventDto {
  action: 'disconnect';
  container: string;
  name: string;
  driver: string;
}

interface NetworkPruneEventDto extends NetworkBaseEventDto {
  action: 'prune';
  reclaimed: number;
}

export type NetworkEventDto = NetworkCreateEventDto | NetworkDestroyEventDto| NetworkConnectEventDto | NetworkDisconnectEventDto | NetworkPruneEventDto;
