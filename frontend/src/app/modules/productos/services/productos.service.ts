import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private apiUrl = 'http://localhost:3000/api/productos';

  productos = signal<Producto[]>([]);

  constructor(private http: HttpClient) {}

  cargarProductos(termino: string = '') {
    const url = termino.trim() ? `${this.apiUrl}/buscar?termino=${termino}` : this.apiUrl;
    this.http.get<Producto[]>(url).subscribe(data => {
      this.productos.set(data); 
    });
  }

  reducirStockLocal(productoId: number) {
    this.productos.update(lista => 
      lista.map(p => p.id === productoId ? { ...p, stock: p.stock - 1 } : p)
    );
  }
}