import { Component } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ProductoCard } from '../../components/producto-card/producto-card';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-list-productos',
  imports: [ProductoCard],
  templateUrl: './list-productos.html',
  styleUrl: './list-productos.css',
})
export class ListProductos {




productos: Producto[] = [];

constructor(private productosService: ProductosService) {
  this.productosService.getProductos()
    .subscribe(productos => {
      this.productos = productos;
    });



}
}
