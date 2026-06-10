import { Routes } from '@angular/router';
import { ListProductos } from './modules/productos/pages/list-productos/list-productos';
import { LoginView } from './modules/login/pages/login-view/login-view';

export const routes: Routes = [

    {
    path: 'productos',
    component: ListProductos
    }
];
export const routes: Routes = [
      { path: 'login', component: LoginView }
];
