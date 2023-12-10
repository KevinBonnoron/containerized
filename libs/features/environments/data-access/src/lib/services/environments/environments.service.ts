import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { EnvironmentsEntity } from '../../+state/environments.models';

@Injectable()
export class EnvironmentsService {
  private readonly httpClient = inject(HttpClient);

  loadAll() {
    return this.httpClient.get<EnvironmentsEntity[]>('http://localhost:3000/api/environments');
  }
}