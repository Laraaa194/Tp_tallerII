import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos.service';
import { ProductoForm } from '../../components/producto-form/producto-form';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [CommonModule, ProductoForm],
  templateUrl: './nuevo-producto.html',
  styleUrl: './nuevo-producto.css'
})
export class NuevoProducto {
  private productosService = inject(ProductosService);
  private router = inject(Router);

  mensajeExito: string = '';
  mensajeError: string = '';

  crear(producto: Omit<Producto, 'id'>) {
    this.mensajeExito = '';
    this.mensajeError = '';

    this.productosService.crearProducto(producto).subscribe({
      next: () => {
        this.mensajeExito = '¡Producto creado con éxito!';
        setTimeout(() => this.router.navigate(['/productos']), 2000);
      },
      error: (err) => {
        this.mensajeError = err.error?.message || 'Error al crear el producto.';
      }
    });
  }
}
