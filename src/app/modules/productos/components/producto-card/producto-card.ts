import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../../carrito/services/carrito.service';

@Component({
  selector: 'app-producto-card',
  imports: [CommonModule],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.css',
})
export class ProductoCard {

  constructor(private carritoService: CarritoService, private router: Router) {}

  @Input() producto!: Producto;
  @Input() esAdmin: boolean = false;
  @Output() actualizado = new EventEmitter<void>();
  @Output() eliminarSolicitado = new EventEmitter<Producto>();
  @Output() errorLogin = new EventEmitter<string>();

  mensaje = '';

  agregar(productoId: number) {
    this.carritoService.agregarAlCarrito(productoId)
      .subscribe({
        next: () => {
          this.mensaje = '✅ Producto agregado al carrito';
          this.actualizado.emit();
          setTimeout(() => {
            this.mensaje = '';
          }, 1000);
        },
        error: (err) => {
          if (err.status === 401) {
            this.errorLogin.emit('Recordá que para agregar productos al carrito tenés que estar logueado 🛒');
          } else {
            this.mensaje = 'No se pudo agregar, stock insuficiente';
          }
          console.error(err);
        }
      });
  }

  editar() {
    this.router.navigate(['/productos/editar', this.producto.id]);
  }

  eliminar() {
    this.eliminarSolicitado.emit(this.producto);
  }
}
