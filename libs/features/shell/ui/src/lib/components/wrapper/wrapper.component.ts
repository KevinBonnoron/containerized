import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Location, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Title } from '@angular/platform-browser';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

import { skipEmpty } from '@containerized/utils';

import { EnvironmentsStore } from '@containerized/features/environments/data-access';
import { EnvironmentSelectorComponent } from '@containerized/features/environments/ui';
import type { MenuItems } from '../../models';
import { MenuComponent } from '../menu/menu.component';

const DESKTOP_BREAKPOINTS = [Breakpoints.XLarge, Breakpoints.Large] as const;

const MOBILE_BREAKPOINTS = [Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall] as const;

@Component({
  selector: 'containerized-shell-wrapper',
  standalone: true,
  imports: [EnvironmentSelectorComponent, MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, MenuComponent, NgTemplateOutlet, RouterOutlet],
  templateUrl: './wrapper.component.html',
  styleUrl: './wrapper.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellWrapperComponent {
  private readonly router = inject(Router);
  private readonly location = inject(Location);
  private readonly ngTitle = inject(Title);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly environmentsStore = inject(EnvironmentsStore);

  readonly breakpoint = toSignal(this.breakpointObserver.observe([...DESKTOP_BREAKPOINTS, ...MOBILE_BREAKPOINTS]).pipe(map((breakpointState) => (DESKTOP_BREAKPOINTS.some((breakpoint) => breakpointState.breakpoints[breakpoint]) ? 'desktop' : 'mobile'))));

  readonly menuItems = computed(() => {
    let menuItems: MenuItems = [
      { label: 'home', icon: 'home-line', path: '/welcome' },
      { label: 'environments', icon: 'settings-line', path: '/environments' },
    ];

    const selectedEnvironment = this.environmentsStore.selected();
    if (selectedEnvironment !== undefined) {
      menuItems.push(
        { label: 'dashboard', icon: 'dashboard-2-line', path: `/docker/${selectedEnvironment.id}/home` },
        { label: 'containers', icon: 'instance-line', path: `/docker/${selectedEnvironment.id}/containers` },
        { label: 'images', icon: 'image-2-line', path: `/docker/${selectedEnvironment.id}/images` },
        { label: 'volumes', icon: 'database-2-line', path: `/docker/${selectedEnvironment.id}/volumes` },
        { label: 'networks', icon: 'share-line', path: `/docker/${selectedEnvironment.id}/networks` },
        { label: 'events', icon: 'calendar-line', path: `/docker/${selectedEnvironment.id}/events` }
      );
    }

    return menuItems;
  });

  readonly title = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.ngTitle.getTitle()),
      skipEmpty()
    )
  );

  back() {
    this.location.back();
  }
}
