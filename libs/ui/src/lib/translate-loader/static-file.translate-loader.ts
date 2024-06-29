import type { TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';

export class StaticFileTranslateLoader implements TranslateLoader {
  constructor(private readonly files: Record<string, any>) {}

  getTranslation(lang: string) {
    return of(this.files[lang].default);
  }
}
