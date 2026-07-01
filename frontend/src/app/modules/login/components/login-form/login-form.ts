import {Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, ReactiveFormsModule } from '@angular/forms';
import {ValidationService } from '../../services/validation-service';
import {NgClass } from '@angular/common';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login-form',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LoginForm {

  form!: FormGroup;
  isEmailInvalid: boolean = false;
  isPasswordInvalid: boolean = false;
  formValido:boolean = false;
  mensajeError:string="";
  mensajeErrorPassword: string = "";
  mensajeErrorEmail: string = "";

  @Output() loginCompletado = new EventEmitter<void>();

  constructor(private validationService: ValidationService,
    private authService: AuthService) {}

  ngOnInit() {

    this.form = this.validationService.getForm();
    this.form.valueChanges.subscribe(() => {
    this.chequearErrores();
    });

  }

  private chequearErrores() {
    this.isEmailInvalid = this.validationService.isEmailInvalido();
    this.isPasswordInvalid = this.validationService.isPasswordInvalido();
    this.formValido = this.validationService.isFormValido();
    if (this.isPasswordInvalid) {
          this.mensajeErrorPassword = this.validationService.getMensajeErrorPassword();
        }
    if (this.isEmailInvalid) {
          this.mensajeErrorEmail = this.validationService.getMensajeErrorEmail();
        }

  }

  validarEnvio() {
    if (this.validationService.isFormValido()) {
      const datosLogin = this.form.value;
      this.authService.login(datosLogin).subscribe({
        next: (response) => {
          console.log('¡Login exitoso en el backend!', response);
          localStorage.setItem('token', response.token);
          this.loginCompletado.emit();
        },
        error: (err) => {
           this.mensajeError = err.error.message;
          this.validationService.resetForm();
        }
      });
    }
  }
}
