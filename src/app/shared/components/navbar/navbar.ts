import { Component, inject, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../../modules/carrito/services/carrito.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',

})
export class Navbar {
  private carritoService = inject(CarritoService);
  // Usamos el flujo de datos reactivo
  cantidadItems = toSignal(this.carritoService.carrito$, { initialValue: [] });
}