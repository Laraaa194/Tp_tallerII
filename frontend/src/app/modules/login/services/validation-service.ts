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

getMensajeErrorPassword(): string {
  const control = this.loginForm.get('password');
  
  if (!control || !control.errors) {
    return '';
  }
    //msj para el cant de caracteres invalida
  if (control.errors['minlength']) {
    const minRequired = control.errors['minlength'].requiredLength;
    return `La contraseña debe tener al menos ${minRequired} caracteres.`;
  }

  //msj para el patron invalido
  if (control.errors['pattern']) {
    return 'La contraseña debe contener al menos una mayúscula, una minúscula y un número.';
  }

  return 'Contraseña inválida.';
}

  getMensajeErrorEmail(): string {
    const control = this.loginForm.get('email');
    
    if (!control || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'El correo electrónico es obligatorio';
    }
    
    if (control.errors['email']) {
      return 'El formato del correo electrónico no es válido';
    }

    return 'Correo electrónico inválido.';
  }

  isFormValido(): boolean {
    return this.loginForm.valid;
  }

  resetForm() {
    this.loginForm.reset();
  }


}
