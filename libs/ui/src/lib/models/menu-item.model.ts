import { IconName } from 'angular-remix-icon/lib/icon-names';

export interface MenuItem {
  label: string;
  path: string;
  icon: IconName;
}

export type MenuItems = MenuItem[];
