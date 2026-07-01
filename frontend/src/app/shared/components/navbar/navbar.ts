import { Component, computed, inject, OnInit } from '@angular/core';
import { CarritoService } from '../../../modules/carrito/services/carrito.service';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {

  private router = inject(Router);
  private carritoService = inject(CarritoService);

  estaEnAuth: boolean = false;
  estaEnProductos: boolean = false;
  estaLogueado: boolean = false;
  nombreUsuario: string = '';
  mostrarMenu: boolean = false;

  cantidadItems = computed(() => this.carritoService.carrito().reduce((totalAcumulado, item) => totalAcumulado + item.cantidad, 0));

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      this.estaEnAuth = url.includes('/login') || url.includes('/registro');
      this.estaEnProductos = url.includes('/productos');
      this.verificarSesion();
    });
  }

  ngOnInit() {
    this.verificarSesion();
  }

  verificarSesion() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payloadBase64 = token.split('.')[1];
          const payloadDecodificado = JSON.parse(atob(payloadBase64));
          if (!this.estaLogueado) {
            this.carritoService.refrescarCarrito();
          }
          this.estaLogueado = true;
          const nombreCrudo = payloadDecodificado.nombre || 'Usuario';
          this.nombreUsuario = nombreCrudo.charAt(0).toUpperCase() + nombreCrudo.slice(1).toLowerCase();
        } catch (error) {
          this.cerrarSesion();
        }
      } else {
        this.estaLogueado = false;
        this.nombreUsuario = '';
      }
    }
  }

  toggleMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  cerrarMenu() {
    this.mostrarMenu = false;
  }

  cerrarSesion() {
    localStorage.removeItem('token');
    this.carritoService.limpiarCarrito();
    this.estaLogueado = false;
    this.nombreUsuario = '';
    this.mostrarMenu = false;
    this.router.navigate(['/login']);
  }
}
