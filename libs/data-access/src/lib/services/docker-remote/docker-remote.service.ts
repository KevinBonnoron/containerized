import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { filter, first, Observable, shareReplay, switchMap } from 'rxjs';

import { toObservable } from '@angular/core/rxjs-interop';
import { EnvironmentsStore } from '@containerized/features/environments/data-access';
import { API_URL_TOKEN } from '@containerized/ui';
import { notNil } from '@containerized/utils';

@Injectable()
export class DockerRemoteService {
  private readonly environmentsStore = inject(EnvironmentsStore);
  private readonly apiUrl = inject(API_URL_TOKEN);
  protected readonly httpClient = inject(HttpClient);

  protected readonly selectedId$ = toObservable(this.environmentsStore.selectedId).pipe(
    filter(notNil),
    shareReplay(1)
  );

  get(url: string, options: { responseType?: 'text'; }): Observable<any>;
  get<T>(url: string): Observable<T>;
  get<T>(url: string, options?: any) {
    return this.selectedId$.pipe(
      switchMap((id) => this.httpClient.get<T>(`${this.apiUrl}/api/docker/${id}${url}`, { ...options, reportProgress: false })),
      first(),
    );
  }

  post<T, B = unknown>(url: string, body: B) {
    return this.selectedId$.pipe(
      first(),
      switchMap((id) => this.httpClient.post<T>(`${this.apiUrl}/api/docker/${id}${url}`, body))
    );
  }

  put<T, B = unknown>(url: string, body: B) {
    return this.selectedId$.pipe(
      first(),
      switchMap((id) => this.httpClient.put<T>(`${this.apiUrl}/api/docker/${id}${url}`, body))
    );
  }

  delete<T>(url: string) {
    return this.selectedId$.pipe(
      first(),
      switchMap((id) => this.httpClient.delete<T>(`${this.apiUrl}/api/docker/${id}${url}`))
    );
  }
}
