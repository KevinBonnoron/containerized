import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import localEn from '@angular/common/locales/en';
import localeFr from '@angular/common/locales/fr';
import {
  ENVIRONMENT_INITIALIZER,
  LOCALE_ID,
  importProvidersFrom,
  inject,
  makeEnvironmentProviders
} from '@angular/core';
import type {
  TranslateModuleConfig} from '@ngx-translate/core';
import {
  TranslateCompiler,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';

import { StaticFileTranslateLoader } from '../translate-loader';

const commonTranslateModuleConfig: TranslateModuleConfig = {
  defaultLanguage: 'fr',
  useDefaultLang: true,
  isolate: true,
  extend: true,
  compiler: {
    provide: TranslateCompiler,
    useClass: TranslateMessageFormatCompiler,
  },
};

const environmentInitializer = () => {
  registerLocaleData(localeFr);
  registerLocaleData(localEn);
  const translateService = inject(TranslateService);
  translateService.use(translateService.getBrowserLang()!);
};

export const provideRootTranslate = () =>
  makeEnvironmentProviders([
    { provide: ENVIRONMENT_INITIALIZER, useValue: environmentInitializer, multi: true },
    { provide: LOCALE_ID, useFactory: (translateService: TranslateService) => translateService.currentLang, deps: [TranslateService] },
    importProvidersFrom(
      TranslateModule.forRoot({
        ...commonTranslateModuleConfig,
        loader: { provide: TranslateLoader, useFactory: (httpClient: HttpClient) => new TranslateHttpLoader(httpClient), deps: [HttpClient] },
      })
    ),
  ]);

export const provideChildTranslate = (files: Record<string, object>) => makeEnvironmentProviders([
  importProvidersFrom(
    TranslateModule.forChild({
      ...commonTranslateModuleConfig,
      loader: { provide: TranslateLoader, useFactory: () => new StaticFileTranslateLoader(files) },
    })
  )
]);
