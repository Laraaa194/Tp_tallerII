import { Component } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';

@Component({
  selector: 'app-login-view',
  imports: [LoginForm],
  templateUrl: './login-view.html',
  styleUrl: './login-view.css',
})
export class LoginView {}
