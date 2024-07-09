import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmButtonComponent, DotComponent } from '@containerized/ui';
import { AngularRemixIconComponent } from 'angular-remix-icon';
import { AbstractUiDirective } from '../../../directives';

@Component({
  selector: 'containerized-docker-containers-view-cards',
  standalone: true,
  imports: [AngularRemixIconComponent, ConfirmButtonComponent, DotComponent, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatIconModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerContainersViewCardsComponent extends AbstractUiDirective {}
