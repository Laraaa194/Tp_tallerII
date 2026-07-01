import { Component, inject } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-login-view',
  imports: [LoginForm, RouterLink],
  templateUrl: './login-view.html',
  styleUrls: ['./login-view.css'],
})
export class LoginView {
  private router = inject(Router);

  loginExitoso: boolean = false;

  manejarLoginExitoso() {
    this.loginExitoso = true;

    setTimeout(() => {
      this.router.navigate(['/productos']);
    }, 2500);
  }
}
