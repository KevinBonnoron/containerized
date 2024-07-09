import { BaseEventDto } from './docker-base-event.dto';

type ImageBaseEventDto = BaseEventDto<'image'>;

interface ImageDeleteEvent extends ImageBaseEventDto {
  action: 'delete';
  id: string;
  name: string;
}

interface ImagePullEventDto extends ImageBaseEventDto {
  action: 'pull';
  id: string;
  name: string;
}

interface ImagePruneEventDto extends ImageBaseEventDto {
  action: 'prune';
  reclaimed: number;
}

interface ImageUntagEventDto extends ImageBaseEventDto {
  action: 'untag';
  id: string;
  name: string;
}

export type ImageEventDto = ImageDeleteEvent | ImagePullEventDto | ImagePruneEventDto | ImageUntagEventDto;
