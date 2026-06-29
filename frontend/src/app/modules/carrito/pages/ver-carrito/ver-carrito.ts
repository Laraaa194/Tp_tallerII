import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'; // Importante importar Subscription
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
export class VerCarrito implements OnInit, OnDestroy {
  private carritoService = inject(CarritoService);

  itemsCarrito: ItemCarrito[] = [];
  cargando = true;
  error = false;

  private sub: Subscription | null = null; // Definimos el tipo correctamente

  ngOnInit(): void {
    // Suscripción al flujo global del servicio
    this.sub = this.carritoService.carrito$.subscribe({
      next: (items) => {
        this.itemsCarrito = items.map(i => this.mapearItem(i));
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private mapearItem(item: CarritoItemResponse): ItemCarrito {
    return {
      productoId: String(item.producto.id),
      nombre: item.producto.nombre,
      precio: item.producto.precio,
      cantidad: item.cantidad,
      stock: item.producto.stock,
      imagenUrl: item.producto.imagenUrl,
      categoria: item.producto.categoria
    };
  }

  get totalCarrito(): number {
    return this.itemsCarrito.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );
  }

  get cantidadTotalItems(): number {
    return this.itemsCarrito.reduce((acc, item) => acc + item.cantidad, 0);
  }

  onCantidadCambiada(itemActualizado: ItemCarrito): void {
    const carritoItemId = Number(itemActualizado.productoId);
    this.carritoService.actualizarCantidad(carritoItemId, itemActualizado.cantidad).subscribe();
 
  }

  onEliminarItem(productoId: string): void {
    const carritoItemId = Number(productoId);
    this.carritoService.eliminarItem(carritoItemId).subscribe();

  }
}