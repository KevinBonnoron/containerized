import { SlicePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ConfirmButtonComponent } from '@containerized/ui';
import { AngularRemixIconComponent } from 'angular-remix-icon';
import { AbstractUiDirective } from '../../../directives';

@Component({
  selector: 'containerized-docker-images-view-cards',
  standalone: true,
  imports: [AngularRemixIconComponent, ConfirmButtonComponent, MatCardModule, MatChipsModule, SlicePipe],
  templateUrl: './cards.component.html',
})
export class DockerImagesViewCardsComponent extends AbstractUiDirective {}
