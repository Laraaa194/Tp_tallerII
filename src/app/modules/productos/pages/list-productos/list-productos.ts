import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, startWith, switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ProductosService } from '../../services/productos.service';
import { ProductoCard } from '../../components/producto-card/producto-card';
import { Producto } from '../../interfaces/producto';
@Component({
  selector: 'app-list-productos',
  imports: [ProductoCard, AsyncPipe],
  templateUrl: './list-productos.html',
  styleUrl: './list-productos.css',
})
export class ListProductos implements OnInit {

  private productosService = inject(ProductosService);
  private destroyRef = inject(DestroyRef);
  public productos$!: Observable<Producto[]>;
  searchSubject = new Subject<string>();

  esAdmin: boolean = false;
  mostrarModal: boolean = false;
  productoAEliminar: Producto | null = null;
  popup: string = '';

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.esAdmin = payload?.rol === 'ADMIN';
      } catch {
        this.esAdmin = false;
      }
    }

    this.productos$ = this.searchSubject.pipe(
      startWith(''),
      debounceTime(400),
      switchMap(termino => this.productosService.buscarProductos(termino)),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  recargarProductos() {
    this.searchSubject.next('');
  }

  pedirConfirmacionEliminar(producto: Producto) {
    this.productoAEliminar = producto;
    this.mostrarModal = true;
  }

  confirmarEliminar() {
    if (!this.productoAEliminar) return;
    this.productosService.eliminarProducto(this.productoAEliminar.id).subscribe({
      next: () => {
        this.mostrarModal = false;
        this.productoAEliminar = null;
        this.recargarProductos();
        this.mostrarPopup('✅ Producto eliminado con éxito');
      },
      error: (err) => {
        this.mostrarModal = false;
        this.mostrarPopup('❌ Error al eliminar el producto');
      }
    });
  }

  private mostrarPopup(mensaje: string) {
    this.popup = mensaje;
    setTimeout(() => { this.popup = ''; }, 3000);
  }

  cancelarEliminar() {
    this.mostrarModal = false;
    this.productoAEliminar = null;
  }
}
