import { Directive, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnvironmentDto } from '@containerized/shared';
import { DataLayoutComponent } from 'ngx-data-layout';

@Directive({
  standalone: true
})
export class AbstractUiDirective extends DataLayoutComponent<EnvironmentDto> {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  editEnvironment(environment: EnvironmentDto) {
    this.router.navigate(['./', environment.id, 'edit'], { relativeTo: this.activatedRoute });
  }
}
