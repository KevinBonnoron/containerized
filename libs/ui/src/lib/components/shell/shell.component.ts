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

import { MenuItems } from '../../models';
import { MenuComponent } from '../menu/menu.component';

const DESKTOP_BREAKPOINTS = [
  Breakpoints.XLarge,
  Breakpoints.Large
] as const;

const MOBILE_BREAKPOINTS = [
  Breakpoints.Medium,
  Breakpoints.Small,
  Breakpoints.XSmall
] as const;

@Component({
  standalone: true,
  imports: [MatIconModule, MatListModule, MatSidenavModule, MatToolbarModule, MenuComponent, NgTemplateOutlet, RouterOutlet],
  selector: 'containerized-ui-shell',
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  private readonly router = inject(Router);
  private readonly ngLocation = inject(Location);
  private readonly ngTitle = inject(Title);
  private readonly breakpointObserver = inject(BreakpointObserver);

  readonly breakpoint = toSignal(this.breakpointObserver.observe([...DESKTOP_BREAKPOINTS, ...MOBILE_BREAKPOINTS]).pipe(
    map((breakpointState) => DESKTOP_BREAKPOINTS.some((breakpoint) => breakpointState.breakpoints[breakpoint]) ? 'desktop' : 'mobile')
  ));

  readonly menus = computed<MenuItems>(() => [
    { label: 'home', icon: 'home-line', path: '/home' },
    { label: 'container', icon: 'instance-line', path: `/docker/1/containers` },
    { label: 'image', icon: 'image-2-line', path: `/docker/1/images` },
    { label: 'volume', icon: 'database-2-line', path: `/docker/1/volumes` },
  ]);

  readonly title = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.ngTitle.getTitle()),
      skipEmpty(),
    )
  );

  back() {
    this.ngLocation.back();
  }
}
