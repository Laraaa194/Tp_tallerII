import { Routes } from '@angular/router';
import { LoginView } from './modules/login/pages/login-view/login-view';
import { RegisterView } from './modules/register/pages/register-view';

export const routes: Routes = [
      { path: 'login', component: LoginView },
      { path: 'register', component: RegisterView }
];
