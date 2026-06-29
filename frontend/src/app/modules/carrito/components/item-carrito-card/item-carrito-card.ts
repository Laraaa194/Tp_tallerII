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
 
  @Output() cantidadCambiada = new EventEmitter<ItemCarrito>();
 
  @Output() eliminar = new EventEmitter<number>();
 
onIncrementar(): void {
  if (this.item.stock > 0) {
    this.cantidadCambiada.emit({ ...this.item, cantidad: this.item.cantidad + 1 });
  }
}

onDecrementar(): void {
  if (this.item.cantidad > 1) {
    this.cantidadCambiada.emit({ ...this.item, cantidad: this.item.cantidad - 1 });
  }
}
 
  onEliminar(): void {
    this.eliminar.emit(this.item.id);
  }
}
