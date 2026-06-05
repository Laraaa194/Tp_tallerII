import {Component, OnInit } from '@angular/core';
import {FormGroup, ReactiveFormsModule } from '@angular/forms';
import {ValidationService } from '../../services/validation-service';
import {NgClass } from '@angular/common';

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

  constructor(private validationService: ValidationService) {}

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
  }

  validarEnvio() {
    //TO DO : aca hay que llamar al servicio Auth para que haga la autenticacion con el usuario
    //si responde false, se resetea el form y se muestra un mesja como que email o contraseña incorrecta
    if (this.validationService.isFormValido()) {
        this.formValido = true;
    } else {
      this.validationService.resetForm();
    }
  }
}





