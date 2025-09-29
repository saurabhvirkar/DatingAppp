import { Component, Input, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule]
})
export class DateInputComponent implements ControlValueAccessor {
  @Input() label!:string;
  @Input() maxDate!: Date;
  // Use Angular Material Datepicker config

  constructor(@Self() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  private onChange: any = () => {};
  private onTouched: any = () => {};

  writeValue(obj: any): void {
    if (this.ngControl && this.ngControl.control) {
      this.ngControl.control.setValue(obj);
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }



}
