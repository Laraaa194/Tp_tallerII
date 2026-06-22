import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CarritoService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  agregarAlCarrito(productoId: number) {
    return this.http.post(`${this.apiUrl}/carrito`, {
      productoId,
      cantidad: 1
    });
  }

  getCarrito() {
    return this.http.get(`${this.apiUrl}/carrito`);
  }
}