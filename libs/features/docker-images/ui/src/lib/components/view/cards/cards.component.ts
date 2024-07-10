import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmButtonComponent } from '@containerized/ui';
import { AngularRemixIconComponent } from 'angular-remix-icon';
import { AbstractUiDirective } from '../../../directives';

@Component({
  selector: 'containerized-docker-images-view-cards',
  standalone: true,
  imports: [AngularRemixIconComponent, ConfirmButtonComponent, MatButtonModule, MatCardModule, MatChipsModule, MatIconModule],
  templateUrl: './cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerImagesViewCardsComponent extends AbstractUiDirective {}
