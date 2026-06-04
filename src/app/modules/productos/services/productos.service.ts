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
      imagenUrl: ''
    },
    {
      id: 2,
      nombre: 'Mouse',
      descripcion: 'Mouse inalámbrico',
      clasificacion: 'Tecnología',
      precio: 50,
      imagenUrl: ''
    }
  ];

 getProductos(): Observable<Producto[]> {
  return of(this.productos);
}
}
