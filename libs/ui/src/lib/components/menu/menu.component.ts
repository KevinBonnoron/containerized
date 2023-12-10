import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MenuItems } from '../../models';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  standalone: true,
  imports: [MenuItemComponent],
  selector: 'containerized-ui-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {
  @Input()
  menus!: MenuItems;
}
