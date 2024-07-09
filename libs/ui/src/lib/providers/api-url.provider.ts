import { makeEnvironmentProviders } from '@angular/core';

import { API_URL_TOKEN } from '../tokens';

export const provideApiUrl = (apiUrl: string) => makeEnvironmentProviders([{ provide: API_URL_TOKEN, useValue: apiUrl }]);
