import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private productos: Producto[] = [
    {
      id: 1,
      nombre: 'Notebook',
      descripcion: 'Notebook gamer',
      clasificacion: 'Tecnología',
      precio: 1500,
      imagenUrl: 'notebook1.png'
    },
    {
      id: 2,
      nombre: 'Mouse',
      descripcion: 'Mouse inalámbrico',
      clasificacion: 'Tecnología',
      precio: 50,
      imagenUrl: 'mouse.png'
    }
  ];

 getProductos(): Observable<Producto[]> {
  return of(this.productos);
}
// Metodo para cuando tengamos bdd 
// getProductos(): Observable<Producto[]> {
//   return this.http.get<Producto[]>(`${this.apiUrl}/productos`);
// }

buscarProductos(termino: string): Observable<Producto[]> {
  if (!termino.trim()) {
    return this.getProductos(); // Retorna todos si el input está vacío
  }
  const resultado = this.productos.filter(producto =>
    producto.nombre.toLowerCase().includes(termino.toLowerCase())
  );
  return of(resultado);
}

// buscarProductos(termino: string): Observable<Producto[]> {
//   return this.http.get<Producto[]>(`${this.apiUrl}/productos?search=${termino}`);
// }
}
