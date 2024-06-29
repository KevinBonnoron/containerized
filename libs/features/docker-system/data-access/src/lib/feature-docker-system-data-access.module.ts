import { NgModule } from '@angular/core';
import { DockerSystemStore } from './docker-system.store';
import { DockerSystemService } from './services';

@NgModule({
  providers: [
    DockerSystemStore,
    DockerSystemService
  ]
})
export class FeatureDockerSystemDataAccessModule {}
