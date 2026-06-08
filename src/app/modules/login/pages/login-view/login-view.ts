import { Component } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';

@Component({
  selector: 'app-login-view',
  standalone: true,
  imports: [LoginForm],
  templateUrl: './login-view.html',
  styleUrls: ['./login-view.css'],
})
export class LoginView {}
