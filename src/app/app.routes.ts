import { Routes } from '@angular/router';
import { ListProductos } from './modules/productos/pages/list-productos/list-productos';
import { LoginView } from './modules/login/pages/login-view/login-view';
import { RegisterView } from './modules/register/pages/register-view';
import { NuevoProducto } from './modules/productos/pages/nuevo-producto/nuevo-producto';
import { EditarProducto } from './modules/productos/pages/editar-producto/editar-producto';
import { VerCarrito } from './modules/carrito/pages/ver-carrito/ver-carrito';

export const routes: Routes = [
    {
    path: '',
    component: ListProductos
    },
    {
    path: 'productos',
    component: ListProductos
    },
    {
    path: 'productos/nuevo',
    component: NuevoProducto
    },
    {
    path: 'productos/editar/:id',
    component: EditarProducto
    },
    { path: 'login',
    component: LoginView
    },
    {
      path: 'register',
      component: RegisterView
    },

    { path: 'carrito',
    component: VerCarrito }
];

