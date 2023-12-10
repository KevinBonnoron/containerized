import { and } from 'monadojs';

import { notEmpty } from './not-empty.operator';
import { notNil } from './not-nil.operator';

export const notNilNorEmpty = and(notNil, notEmpty);
