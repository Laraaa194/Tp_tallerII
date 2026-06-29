import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { passwordStrengthValidator } from '../../../../shared/validators/password-strength.validator';
import { passwordMatchValidator } from '../../../../shared/validators/password-match.validator';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css'
})
export class RegisterForm {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private router = inject(Router);
  private cdRef = inject(ChangeDetectorRef);
  registerForm: FormGroup;
  submitMessage: string = '';
  isError: boolean = false;
  registrationSuccessful: boolean = false;

  isSubmitted: boolean = false;

  constructor() {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), passwordStrengthValidator()]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: passwordMatchValidator('password', 'confirmPassword')
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitMessage = '';
    this.isError = false;
    this.isSubmitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    const userData = {
      nombre: this.registerForm.value.nombre,
      apellido: this.registerForm.value.apellido,
      email: this.registerForm.value.email,
      direccion: this.registerForm.value.direccion,
      password: this.registerForm.value.password
    };

    this.userService.registerUser(userData).subscribe({

      next: (response) => {
        this.registrationSuccessful = true;
        this.isSubmitted = false;

        this.cdRef.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },

      error: (err) => {
        this.isError = true;
        this.registrationSuccessful = false;

        this.submitMessage = err.error?.message || 'Error de conexión con el servidor.';
      }

    });
  }
}
