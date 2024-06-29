import { provideHttpClient } from '@angular/common/http';
import { provideExperimentalZonelessChangeDetection, type ApplicationConfig } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideApiUrl, provideRootTranslate, provideSocketIO } from '@containerized/ui';
import { RiCalendarEventLine, RiCalendarLine, RiDashboard2Line, RiDatabase2Line, RiDeleteBinLine, RiFileTextLine, RiHomeLine, RiImage2Line, RiInstanceLine, RiLayoutGridLine, RiSettingsLine, RiShareLine, RiTableLine, RiTerminalBoxLine, RiTerminalLine, provideRemixIcon } from 'angular-remix-icon';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideAnimations(),
    provideRootTranslate(),
    provideApiUrl(environment.apiUrl),
    provideSocketIO(environment.apiUrl),
    provideRemixIcon({
      RiCalendarEventLine,
      RiCalendarLine,
      RiDatabase2Line,
      RiHomeLine,
      RiImage2Line,
      RiInstanceLine,
      RiLayoutGridLine,
      RiTableLine,
      RiTerminalBoxLine,
      RiTerminalLine,
      RiDeleteBinLine,
      RiShareLine,
      RiDashboard2Line,
      RiFileTextLine,
      RiSettingsLine,
    }),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        floatLabel: 'always',
        subscriptSizing: 'dynamic',
      },
    },
  ],
};
