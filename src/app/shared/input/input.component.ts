import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent<T = unknown> {
  @Input() label!: string;

  @Input() for?: string;

  @Input() type: string = 'text';

  @Input() controlType: 'input' | 'textarea' = 'input';

  @Input() placeholder?: string;

  @Input() control?: FormControl<T>;

  @Input() errors?: { [key: string]: string };

  @Input() disabled: boolean = false;

  get canDisplayHelpText() {
    if (!this.control) return true;
    return this.control.invalid && (this.control.touched || this.control.dirty);
  }

  constructor() {}

  ngOnInit() {}
}
