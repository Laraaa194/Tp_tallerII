import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../../interfaces/producto';
import { CarritoService } from '../../../carrito/services/carrito.service';

@Component({
  selector: 'app-producto-card',
  imports: [],
  templateUrl: './producto-card.html',
  styleUrl: './producto-card.css',
})

export class ProductoCard {

constructor(private carritoService: CarritoService) {}
@Output() actualizado = new EventEmitter<void>();
@Input() producto!: Producto;

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
        this.mensaje = 'No se pudo agregar, stock insuficiente';
        console.error(err);
      }
    });
}}

