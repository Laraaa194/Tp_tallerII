import { Component, computed, inject } from '@angular/core';
import { ItemCarrito } from '../../interfaces/ItemCarrito';
import { CarritoService } from '../../services/carrito.service';
import { CarritoItemResponse } from '../../interfaces/CarritoItemResponse';
import { ItemCarritoCard } from '../../components/item-carrito-card/item-carrito-card';

@Component({
  selector: 'app-ver-carrito',
  imports: [ItemCarritoCard],
  templateUrl: './ver-carrito.html',
  styleUrl: './ver-carrito.css',
})
export class VerCarrito {
  private carritoService = inject(CarritoService);

cargando = computed(() => this.carritoService.cargando());
  error = computed(() => this.carritoService.error());

  itemsCarrito = computed(() => this.carritoService.carrito().map(i => this.mapearItem(i)));

  totalCarrito = computed(() =>
    this.itemsCarrito().reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  );

  cantidadTotalItems = computed(() =>
    this.itemsCarrito().reduce((acc, item) => acc + item.cantidad, 0)
  );

  onCantidadCambiada(itemActualizado: ItemCarrito): void {
    this.carritoService.actualizarCantidad(itemActualizado.id, itemActualizado.cantidad).subscribe({
      next: () => this.carritoService.refrescarCarrito(),
      error: (err) => {
        console.error(err);
        this.carritoService.refrescarCarrito();
      }
    });
  }

  onEliminarItem(itemId: number): void {
    this.carritoService.eliminarItem(itemId).subscribe({
      next: () => this.carritoService.refrescarCarrito(),
      error: () => this.carritoService.refrescarCarrito()
    });
  }

  private mapearItem(item: CarritoItemResponse): ItemCarrito {
    return {
      id: item.id,
      productoId: String(item.producto.id),
      nombre: item.producto.nombre,
      precio: item.producto.precio,
      cantidad: item.cantidad,
      stock: item.producto.stock,
      imagenUrl: item.producto.imagenUrl,
      categoria: item.producto.categoria
    };
  }
}