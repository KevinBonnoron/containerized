import { importProvidersFrom, makeEnvironmentProviders } from '@angular/core';
import { SocketIoModule } from 'ngx-socket-io';

export const provideSocketIO = (url: string) =>
  makeEnvironmentProviders([
    importProvidersFrom(
      SocketIoModule.forRoot({ url, options: { autoConnect: true } })
    ),
  ]);
