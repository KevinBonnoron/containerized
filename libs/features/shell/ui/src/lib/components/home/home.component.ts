import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShellWrapperComponent } from '../wrapper/wrapper.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, ShellWrapperComponent],
  templateUrl: './home.component.html',
})
export class ShellHomeComponent {}
