import { OnChanges, SimpleChanges, signal } from '@angular/core';

export const WithReactiveChanges = <K extends string>(property: K) => {
  return class Reactive implements OnChanges {
    readonly reactiveSignal = signal(0);

    ngOnChanges(changes: SimpleChanges): void {
      if (changes[property]) {
        this.reactiveSignal.update((value) => value + 1 % 2);
      }
    }
  }
}
