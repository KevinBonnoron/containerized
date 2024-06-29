import { ChangeDetectionStrategy, Component, OnInit, computed, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DockerCommand, parseDockerCommand, stringifyDockerCommand } from '@containerized/shared';
import { TranslateModule } from '@ngx-translate/core';

interface DialogData {
  dockerCommand: DockerCommand;
}

@Component({
  standalone: true,
  imports: [FormsModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, TranslateModule],
  templateUrl: './docker-command-parser-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DockerCommandParserDialogComponent implements OnInit {
  private readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  readonly content = model<string>();
  readonly dockerCommand = computed(() => {
    try {
      return parseDockerCommand(this.content() ?? '');
    } catch {
      return undefined;
    }
  });

  readonly valid = computed(() => this.dockerCommand() !== undefined);

  ngOnInit() {
    if (this.data.dockerCommand) {
      this.content.set(stringifyDockerCommand(this.data.dockerCommand));
    }
  }
}
