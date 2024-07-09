import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  standalone: true,
  imports: [NgStyle],
  selector: 'containerized-dot',
  templateUrl: './dot.component.html',
  styleUrl: './dot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotComponent {
  readonly color = input.required<string>();
}
