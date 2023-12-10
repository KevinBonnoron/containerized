import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [NgStyle],
  selector: 'containerized-dot',
  template: '<span [ngStyle]="{ backgroundColor: color }"></span>',
  styleUrl: './dot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DotComponent {
  @Input()
  color: string = '#3f51b5';
}
