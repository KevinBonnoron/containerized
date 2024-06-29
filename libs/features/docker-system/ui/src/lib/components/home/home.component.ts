import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { DockerSystemStore } from '@containerized/features/docker-system/data-access';

@Component({
  selector: 'containerized-docker-home',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './home.component.html'
})
export class DockerHomeComponent {
  private readonly dockerSystemStore = inject(DockerSystemStore);

  readonly info = this.dockerSystemStore.info;
}
