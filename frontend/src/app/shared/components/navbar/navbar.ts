import { Component, computed, inject } from '@angular/core';
import { CarritoService } from '../../../modules/carrito/services/carrito.service';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  private router = inject(Router);
  estaEnLogin: boolean = false;

  private carritoService = inject(CarritoService);
  cantidadItems = computed(() => this.carritoService.carrito().reduce((totalAcumulado, item) => totalAcumulado + item.cantidad, 0));

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.estaEnLogin = event.urlAfterRedirects.includes('/login');
    });
  }

}