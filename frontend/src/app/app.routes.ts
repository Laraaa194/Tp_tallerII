import { Routes, CanActivateFn } from '@angular/router';
import { ListProductos } from './modules/productos/pages/list-productos/list-productos';
import { LoginView } from './modules/login/pages/login-view/login-view';
import { RegisterView } from './modules/register/pages/register-view';
import { VerCarrito } from './modules/carrito/pages/ver-carrito/ver-carrito';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  return localStorage.getItem('token') ? router.parseUrl('/productos') : true;
};

export const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: 'productos', component: ListProductos },
  { path: 'login', component: LoginView, canActivate: [authGuard] },
  { path: 'register', component: RegisterView, canActivate: [authGuard] },
  { path: 'carrito', component: VerCarrito }
];
