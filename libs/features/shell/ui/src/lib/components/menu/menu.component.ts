import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { ThemeService } from '@containerized/ui';
import type { MenuItems } from '../../models';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  standalone: true,
  imports: [MenuItemComponent],
  selector: 'containerized-shell-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  private readonly themeService = inject(ThemeService);

  readonly menuItems = input.required<MenuItems>();

  switchTheme() {
    this.themeService.setTheme('rose-red');
  }
}
