import { computed, inject, Type } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { notNil } from '@containerized/utils';
import { PartialStateUpdater, patchState, signalStoreFeature, withComputed, withMethods, withState } from '@ngrx/signals';
import { addEntity, EntityId, removeEntity, setAllEntities, updateEntity, withEntities, } from '@ngrx/signals/entities';
import { EntityChanges, EntityIdKey, EntityState } from '@ngrx/signals/entities/src/models';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { isFalse, isTrue } from 'monadojs';
import { catchError, distinctUntilChanged, filter, Observable, of, pipe, shareReplay, switchMap, tap } from 'rxjs';

interface CrudService<T> {
  getAll(): Observable<T[]>;
  create(entity: T): Observable<T>;
  update(id: EntityId, entity: T): Observable<T>;
  remove(entity: T): Observable<EntityId>;
}

interface CrudState {
  loading: boolean;
  loaded: boolean;
  status: boolean | null;
  selectedId: EntityId | null;
}

export function withCrud<T>(serviceClass: Type<CrudService<T>>, idKey = 'id' as EntityIdKey<T>) {
  const selectEntityId = (element: T) => element[idKey] as EntityId;

  return signalStoreFeature(
    withState<CrudState>({ loading: false, loaded: false, status: null, selectedId: null }),
    withEntities<T>(),
    withComputed(({ selectedId, entityMap }) => ({
      selected: computed(() => {
        const id = selectedId();
        return id ? entityMap()[id] : undefined;
      })
    })),
    withMethods((store) => {
      const service = inject(serviceClass);
      const observable$ = toObservable(store.status).pipe(
        filter(notNil),
        distinctUntilChanged(),
        shareReplay(1),
        tap(() => patchState(store, resetStatus())),
      );

      return {
        load: rxMethod<void>(
          pipe(
            tap(() => patchState(store, setLoading())),
            switchMap(() => service.getAll()),
            tap((entities) => patchState(store, setAllEntities(entities, { idKey }), setLoaded())),
          )
        ),
        create: rxMethod<T>(
          switchMap((entity) => service.create(entity).pipe(
            tap((entity) => patchState(store, addEntity(entity, { idKey }), setSuccess())),
            catchError((error) => {
              patchState(store, setFailure());
              return of(error);
            }),
          )),
        ),
        update: rxMethod<T>(
          switchMap((entity) => service.update(selectEntityId(entity), entity).pipe(
            tap((entity) => patchState(store, updateEntity({ id: selectEntityId(entity), changes: ({ ...entity }) as EntityChanges<T & {}> }), setSuccess())),
            catchError((error) => {
              patchState(store, setFailure());
              return of(error);
            }),
          )),
        ),
        remove: rxMethod<T>(
          switchMap((entity) => service.remove(entity).pipe(
            tap(() => patchState(store, removeEntity(selectEntityId(entity)), setSuccess())),
            catchError((error) => {
              patchState(store, setFailure());
              return of(error);
            }),
          )),
        ),
        patchState(...updaters: PartialStateUpdater<EntityState<T>>[]) {
          patchState(store, ...updaters);
        },
        whenSuccess(callback: () => void) {
          observable$.pipe(filter(isTrue)).subscribe(callback);
          return this;
        },
        whenFailure(callback: () => void) {
          observable$.pipe(filter(isFalse)).subscribe(callback);
          return this;
        },
        selectId: (id: string | number) => patchState(store, selectId(id)),
      };
    })
  );
}

export function setLoading(): Partial<CrudState> {
  return { loading: true, loaded: false };
}

export function setLoaded(): Partial<CrudState> {
  return { loading: false, loaded: true };
}

export function setSuccess(): Partial<CrudState> {
  return { status: true };
}

export function setFailure(): Partial<CrudState> {
  return { status: false };
}

export function resetStatus(): Partial<CrudState> {
  return { status: null };
}

export function selectId<T>(id: string | number): Partial<CrudState> {
  return { selectedId: id };
}
