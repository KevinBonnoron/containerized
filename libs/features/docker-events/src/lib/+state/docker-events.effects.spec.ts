import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as DockerEventsActions from './docker-events.actions';
import { DockerEventsEffects } from './docker-events.effects';

describe('DockerEventsEffects', () => {
  let actions: Observable<Action>;
  let effects: DockerEventsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        DockerEventsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(DockerEventsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DockerEventsActions.initDockerEvents() });

      const expected = hot('-a-|', {
        a: DockerEventsActions.loadDockerEventsSuccess({ dockerEvents: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
