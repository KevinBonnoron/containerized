import { Directive, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import type { RegistryDto } from '@containerized/shared';
import { DataLayoutComponent } from 'ngx-data-layout';

@Directive({
  standalone: true,
})
export class AbstractUiDirective extends DataLayoutComponent<RegistryDto> {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  editEnvironment(registry: RegistryDto) {
    this.router.navigate([registry.id, 'edit'], { relativeTo: this.activatedRoute });
  }
}
