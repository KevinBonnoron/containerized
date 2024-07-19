import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, effect, inject, model, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AngularRemixIconComponent } from 'angular-remix-icon';
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { distinctUntilChanged, map } from 'rxjs';
import { DefaultControlValueAccessor } from '../../directives';
import { ConfirmButtonComponent } from '../confirm-button/confirm-button.component';

@Component({
  selector: 'containerized-key-value-editor',
  standalone: true,
  imports: [AngularRemixIconComponent, ConfirmButtonComponent, FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MonacoEditorModule, ReactiveFormsModule],
  templateUrl: './key-value-editor.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeyValueEditorComponent extends DefaultControlValueAccessor<Record<string, string>> implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);

  readonly view = signal<'input' | 'textarea'>('input');
  readonly formArray = this.formBuilder.nonNullable.array<FormGroup>([]);
  readonly editorOptions = { theme: 'vs-dark', language: 'ini' };
  readonly editorModel = model<string>('');

  constructor() {
    super();

    effect(() => {
      const editorModel = this.editorModel();
      if (editorModel === '') {
        return;
      }

      this.formArray.clear();
      for (const [key, value] of editorModel.split('=')) {
        this.addElement({ key, value });
      }
    });
  }

  ngOnInit() {
    this.formArray.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        map((values) => values.filter(({ key }) => key !== '')?.reduce((accumulator, { key, value }) => `${accumulator}${key}=${value}\r\n`, '')),
        distinctUntilChanged()
      )
      .subscribe((values) => this.editorModel.set(values));
  }

  addElement({ key = '', value = '' }: { key?: string; value?: string } = {}) {
    this.formArray.push(
      this.formBuilder.group({
        key: [key, [Validators.required]],
        value: [value, [Validators.required]],
      })
    );
  }

  removeElement(index: number) {
    this.formArray.removeAt(index);
  }

  toggleView() {
    this.view.update((view) => (view === 'input' ? 'textarea' : 'input'));
  }
}
