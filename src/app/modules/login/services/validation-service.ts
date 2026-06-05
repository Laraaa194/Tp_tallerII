import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  private loginForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.inicializarFormulario();
  }

  private inicializarFormulario() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*\d).+$/)]]
    });
  }

  getForm(): FormGroup {
    return this.loginForm;
  }

  isEmailInvalido(): boolean {
    const control = this.loginForm.get('email');

    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isPasswordInvalido(): boolean {
    const control = this.loginForm.get('password');
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  isFormValido(): boolean {
    return this.loginForm.valid;
  }

  resetForm() {
    this.loginForm.reset();
  }


}
