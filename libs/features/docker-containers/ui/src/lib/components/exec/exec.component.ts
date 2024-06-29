import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'containerized-docker-containers-exec',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './exec.component.html',
})
export class DockerContainersExecComponent {}