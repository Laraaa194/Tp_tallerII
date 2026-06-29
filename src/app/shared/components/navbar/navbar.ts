import { Component, inject, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CarritoService } from '../../../modules/carrito/services/carrito.service';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CarritoItemResponse } from '../../../modules/carrito/interfaces/CarritoItemResponse';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);
  estaEnLogin: boolean = false;
  esAdmin: boolean = false;

private carritoService = inject(CarritoService);
cantidadItems = toSignal(this.carritoService.carrito$, { initialValue: [] as CarritoItemResponse[] });

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.estaEnLogin = event.urlAfterRedirects.includes('/login');
      this.verificarAdmin();
    });
    this.verificarAdmin();
  }

  private verificarAdmin() {
    const token = localStorage.getItem('token');
    if (!token) { this.esAdmin = false; return; }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      this.esAdmin = payload?.rol === 'ADMIN';
    } catch {
      this.esAdmin = false;
    }
  }
}

