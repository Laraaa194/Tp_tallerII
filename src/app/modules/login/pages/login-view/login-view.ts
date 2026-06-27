import { Component } from '@angular/core';
import { LoginForm } from '../../components/login-form/login-form';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-view',
  imports: [LoginForm, RouterLink],
  templateUrl: './login-view.html',
  styleUrls: ['./login-view.css'],
})
export class LoginView {}
