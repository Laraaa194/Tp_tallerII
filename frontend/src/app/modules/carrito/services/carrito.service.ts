import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, switchMap, catchError, of, tap } from 'rxjs';
import { CarritoItemResponse } from '../interfaces/CarritoItemResponse';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  carrito = signal<CarritoItemResponse[]>([]);
  cargando = signal(true);
  error = signal(false);

  private refrescarTrigger = new Subject<void>();

  constructor() {
    this.refrescarTrigger.pipe(
      tap(() => {
        this.cargando.set(true);
        this.error.set(false);
      }),
      switchMap(() =>
        this.http.get<CarritoItemResponse[]>(`${this.apiUrl}/carrito`).pipe(
          catchError(() => {
            this.error.set(true);
            return of([] as CarritoItemResponse[]);
          })
        )
      )
    ).subscribe(items => {
      this.carrito.set(items);
      this.cargando.set(false);
    });

    this.refrescarCarrito();
  }

  refrescarCarrito() {
    this.refrescarTrigger.next();
  }

  agregarAlCarrito(productoId: number) {
    return this.http.post(`${this.apiUrl}/carrito`, { productoId, cantidad: 1 });
  }

  actualizarCantidad(id: number, cantidad: number) {
    return this.http.patch(`${this.apiUrl}/carrito/${id}`, { cantidad });
  }

  eliminarItem(id: number) {
    return this.http.delete(`${this.apiUrl}/carrito/${id}`);
  }
}