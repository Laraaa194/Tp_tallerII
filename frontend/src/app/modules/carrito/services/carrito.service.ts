import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CarritoItemResponse } from '../interfaces/CarritoItemResponse';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';
  
  
  private carritoSubject = new BehaviorSubject<CarritoItemResponse[]>([]);
  carrito$ = this.carritoSubject.asObservable();

  constructor() {
    this.refrescarCarrito(); 
  }

  refrescarCarrito() {
    this.http.get<CarritoItemResponse[]>(`${this.apiUrl}/carrito`)
      .subscribe(items => this.carritoSubject.next(items));
  }

  agregarAlCarrito(productoId: number) {
    return this.http.post(`${this.apiUrl}/carrito`, { productoId, cantidad: 1 })
      .pipe(tap(() => this.refrescarCarrito())); 
  }

  actualizarCantidad(id: number, cantidad: number) {
    return this.http.patch(`${this.apiUrl}/carrito/${id}`, { cantidad })
      .pipe(tap(() => this.refrescarCarrito()));
  }

  eliminarItem(id: number) {
    return this.http.delete(`${this.apiUrl}/carrito/${id}`)
      .pipe(tap(() => this.refrescarCarrito()));
  }
}