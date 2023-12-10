import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'containerized-confirm-button',
  imports: [MatButtonModule, MatIconModule, NgStyle],
  templateUrl: './confirm-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmButtonComponent {
  private readonly elementRef = inject(ElementRef);

  @Input()
  icon!: string;

  @Output()
  confirmed = new EventEmitter();

  clicked = false;

  @HostListener('window:click', ['$event'])
  onDomClick(event: MouseEvent) {
    if (this.clicked && !this.elementRef.nativeElement.contains(event.target)) {
      this.clicked = false;
    }
  }

  onClick() {
    if (this.clicked) {
      this.confirmed.emit();
    }

    this.clicked = !this.clicked;
  }
}
