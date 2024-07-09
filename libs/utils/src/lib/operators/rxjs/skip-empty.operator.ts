import type { Observable } from 'rxjs';
import { filter } from 'rxjs';

import { notNilNorEmpty } from '../monadojs';

export const skipEmpty =
  <T>(emptyFn = notNilNorEmpty) =>
  (source$: Observable<null | undefined | T>) =>
    source$.pipe(filter(emptyFn) as any) as Observable<T>;
