import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemCarrito } from '../../interfaces/ItemCarrito';

@Component({
  selector: 'app-item-carrito-card',
  imports: [],
  templateUrl: './item-carrito-card.html',
  styleUrl: './item-carrito-card.css',
})
export class ItemCarritoCard {

  @Input() item!: ItemCarrito;
 
  // Emite el item con la cantidad ya actualizada, para que el padre
  // (ver-carrito.component) actualice el estado global del carrito.
  @Output() cantidadCambiada = new EventEmitter<ItemCarrito>();
 
  // Emite el id del producto a eliminar.
  @Output() eliminar = new EventEmitter<string>();
 
  onIncrementar(): void {
    if (this.item.cantidad < this.item.stock) {
      this.item.cantidad++;
      this.cantidadCambiada.emit(this.item);
    }
  }
 
  onDecrementar(): void {
    if (this.item.cantidad > 1) {
      this.item.cantidad--;
      this.cantidadCambiada.emit(this.item);
    }
  }
 
  onEliminar(): void {
    this.eliminar.emit(this.item.productoId);
  }
}
