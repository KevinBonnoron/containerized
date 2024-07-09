import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import type { RegistryDto } from '@containerized/shared';
import { API_URL_TOKEN } from '@containerized/ui';

@Injectable()
export class RegistriesService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = inject(API_URL_TOKEN);

  getAll() {
    return this.httpClient.get<RegistryDto[]>(`${this.apiUrl}/api/registries`);
  }

  create(registry: RegistryDto) {
    return this.httpClient.post<RegistryDto>(`${this.apiUrl}/api/registries`, registry);
  }

  update(id: number, registry: RegistryDto) {
    return this.httpClient.put<RegistryDto>(`${this.apiUrl}/api/registries/${id}`, registry);
  }

  remove(registry: RegistryDto) {
    return this.httpClient.delete<number>(`${this.apiUrl}/api/registries/${registry.id}`);
  }
}
