import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as EnvironmentsActions from './environments.actions';
import { EnvironmentsEffects } from './environments.effects';

describe('EnvironmentsEffects', () => {
  let actions: Observable<Action>;
  let effects: EnvironmentsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        EnvironmentsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(EnvironmentsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: EnvironmentsActions.initEnvironments() });

      const expected = hot('-a-|', {
        a: EnvironmentsActions.loadEnvironmentsSuccess({ environments: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
