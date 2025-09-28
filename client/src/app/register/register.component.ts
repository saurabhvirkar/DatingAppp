import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, UntypedFormBuilder, FormControl, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../_forms/text-input/text-input.component';
import { DateInputComponent } from '../_forms/date-input/date-input.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    DateInputComponent,
    MatRadioModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  registerForm: UntypedFormGroup | any;
  pattern: string | RegExp | any;
  maxDate!: Date;
  validationErrors: string[]=[];


  constructor(private accountService: AccountService,
    private fb: UntypedFormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required,
      Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl | any) => {
      return control?.value === control?.parent?.controls[matchTo].value ?
        null : { isMatching: true }
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe({
      next: response => {
        this.router.navigateByUrl('/members');
      },
      error: err => {
        // Handle string, array, object errors
        if (typeof err === 'string') {
          this.validationErrors = [err];
        } else if (Array.isArray(err)) {
          this.validationErrors = err.map(e => typeof e === 'object' ? JSON.stringify(e) : String(e));
        } else if (err && err.error) {
          if (typeof err.error === 'string') {
            this.validationErrors = [err.error];
          } else if (Array.isArray(err.error)) {
            this.validationErrors = err.error.map((e: any) => typeof e === 'object' ? JSON.stringify(e) : String(e));
          } else if (typeof err.error === 'object') {
            this.validationErrors = Object.values(err.error).flat().map(e => typeof e === 'object' ? JSON.stringify(e) : String(e));
          } else {
            this.validationErrors = ['Unknown error occurred'];
          }
        } else {
          this.validationErrors = ['Unknown error occurred'];
        }
      }
    });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
