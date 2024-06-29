import { BaseEventDto } from './docker-base-event.dto';

type BuilderBaseEventDto = BaseEventDto<'builder'>;

interface BuilderPruneEventDto extends BuilderBaseEventDto {
  action: 'prune';
  reclaimed: number;
}

export type BuilderEventDto = BuilderPruneEventDto;
