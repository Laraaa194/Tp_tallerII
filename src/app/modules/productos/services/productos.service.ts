import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { Observable } from 'rxjs';
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
  return this.http.post<Producto>(this.apiUrl, producto);
}

actualizarProducto(id: number, producto: Omit<Producto, 'id'>): Observable<Producto> {
  return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
}

eliminarProducto(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

}
