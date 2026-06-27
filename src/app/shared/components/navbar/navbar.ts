import { Component, inject, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
cantidadItems = toSignal(this.carritoService.carrito$, { initialValue: [] });

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.estaEnLogin = event.urlAfterRedirects.includes('/login');
    });
  }

}

