import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

private apiUrl = 'http://localhost:3000/api/productos';

constructor(private http: HttpClient) {}


getProductos(): Observable<Producto[]> {
  return this.http.get<Producto[]>(this.apiUrl);
}

buscarProductos(termino: string): Observable<Producto[]> {
  if (!termino.trim()) return this.getProductos();
  return this.http.get<Producto[]>(`${this.apiUrl}/buscar?termino=${termino}`);
}

crearProducto(producto: Omit<Producto, 'id'>): Observable<Producto> {
  const token = localStorage.getItem('token');
  return this.http.post<Producto>(this.apiUrl, producto, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

actualizarProducto(id: number, producto: Omit<Producto, 'id'>): Observable<Producto> {
  const token = localStorage.getItem('token');
  return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

eliminarProducto(id: number): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.delete(`${this.apiUrl}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
}

}
