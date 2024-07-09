import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { EnvironmentDto } from '@containerized/shared';
import { API_URL_TOKEN } from '@containerized/ui';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentsService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = inject(API_URL_TOKEN);

  getAll() {
    return this.httpClient.get<EnvironmentDto[]>(`${this.apiUrl}/api/environments`);
  }

  create(environment: EnvironmentDto) {
    return this.httpClient.post<EnvironmentDto>(`${this.apiUrl}/api/environments`, environment);
  }

  update(id: number, environment: EnvironmentDto) {
    return this.httpClient.put<EnvironmentDto>(`${this.apiUrl}/api/environments/${id}`, environment);
  }

  remove(environment: EnvironmentDto) {
    return this.httpClient.delete<number>(`${this.apiUrl}/api/environments/${environment.id}`);
  }
}
