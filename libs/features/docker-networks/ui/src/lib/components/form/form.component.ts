import { Component, OnInit, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DockerNetworkDto } from '@containerized/shared';

@Component({
  selector: 'containerized-docker-networks-form',
  standalone: true,
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
})
export class DockerNetworksFormComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  readonly dockerNetwork = input<DockerNetworkDto>();
  readonly submitted = output<DockerNetworkDto>();

  readonly formGroup = this.formBuilder.nonNullable.group({
    id: [''],
    name: ['', [Validators.required]],
    scope: ['local', [Validators.required]],
    driver: ['bridge'],
    enableIPv6: [true],
  });

  ngOnInit() {
    const dockerNetwork = this.dockerNetwork();
    if (dockerNetwork) {
      this.formGroup.setValue({
        id: dockerNetwork.id,
        name: dockerNetwork.name,
        scope: dockerNetwork.scope,
        driver: dockerNetwork.driver,
        enableIPv6: dockerNetwork.enableIPv6,
      });
    }
  }

  onSubmit(dockerNetwork: Partial<DockerNetworkDto>) {
    // TODO add checks
    this.submitted.emit(dockerNetwork as DockerNetworkDto);
  }
}
