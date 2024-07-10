import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import type { MenuItems } from '../../models';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  standalone: true,
  imports: [MenuItemComponent],
  selector: 'containerized-shell-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  readonly menuItems = input.required<MenuItems>();
}
