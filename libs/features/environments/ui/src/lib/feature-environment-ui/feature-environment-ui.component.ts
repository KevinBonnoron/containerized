import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'containerized-feature-environment-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-environment-ui.component.html',
  styleUrl: './feature-environment-ui.component.css',
})
export class FeatureEnvironmentUiComponent {}
