import { FunctionalEffect, createEffect } from '@ngrx/effects';

type EffectCreatorParameters = Parameters<typeof createEffect>;
type FunctionalEffectCreator = (source: EffectCreatorParameters[0], config?: EffectCreatorParameters[1]) => FunctionalEffect;

export const createFnEffect: FunctionalEffectCreator = (source, config) => createEffect(source, { ...config, functional: true });
