import { Component, Input, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class TextInputComponent implements ControlValueAccessor  {
  @Input() label!:string;
  @Input() type='text';


  constructor(@Self() public  ngControl: NgControl) {
    this.ngControl.valueAccessor= this;
   }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  // ngOnInit(): void {
  // }

}
