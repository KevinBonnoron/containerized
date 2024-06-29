import { Directive } from '@angular/core';
import { DataLayoutComponent } from 'ngx-data-layout';

import { DockerEventDto } from '@containerized/shared';

@Directive({
  standalone: true
})
export class AbstractUiDirective extends DataLayoutComponent<DockerEventDto> {}
