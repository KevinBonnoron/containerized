import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AbstractUiDirective } from '../../../directives';

@Component({
  selector: 'containerized-docker-events-view-cards',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './cards.component.html'
})
export class DockerEventsViewCardsComponent extends AbstractUiDirective {}
