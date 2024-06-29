import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AngularRemixIconComponent } from 'angular-remix-icon';

import type { MenuItem } from '../../models';

@Component({
  standalone: true,
  imports: [AngularRemixIconComponent, MatButtonModule, TranslateModule, RouterLink, RouterLinkActive],
  selector: 'containerized-shell-menu-item',
  templateUrl: './menu-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
  readonly menuItem = input.required<MenuItem>();
}
