import { Injectable, inject } from '@angular/core';
import { StyleManagerService } from '../style-manager/style-manager.service';

type Themes = 'magenta-violet' | 'rose-red' | 'azure-blue' | 'cyan-orange';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly styleManagerService = inject(StyleManagerService);

  private currentTheme: Themes = 'azure-blue';

  setTheme(themeToSet: Themes) {
    if (themeToSet !== this.currentTheme) {
      this.currentTheme = themeToSet;
      this.styleManagerService.removeStyle('theme');
      this.styleManagerService.setStyle('theme', `${themeToSet}.css`);
    }
  }

  getTheme() {
    return this.currentTheme;
  }
}
