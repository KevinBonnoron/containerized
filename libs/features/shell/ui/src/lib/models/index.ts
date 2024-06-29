import type { IconName } from 'angular-remix-icon/lib/icon-names';

export interface MenuItem {
  label: string;
  icon: IconName;
  path: string;
}

export type MenuItems = MenuItem[];
