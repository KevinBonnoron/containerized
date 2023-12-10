import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ShellComponent } from '@containerized/ui';

@Component({
  standalone: true,
  imports: [ShellComponent, RouterOutlet],
  selector: 'containerized-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
