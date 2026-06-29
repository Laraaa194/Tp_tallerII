import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos.service';
import { ProductoForm } from '../../components/producto-form/producto-form';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, ProductoForm],
  templateUrl: './editar-producto.html',
  styleUrl: './editar-producto.css'
})
export class EditarProducto implements OnInit {
  private productosService = inject(ProductosService);
  router = inject(Router);
  private route = inject(ActivatedRoute);

  productoId!: number;
  producto: Producto | null = null;
  mensajeExito: string = '';
  mensajeError: string = '';

  ngOnInit() {
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));
    this.productosService.getProductoPorId(this.productoId).subscribe({
      next: (producto) => this.producto = producto,
      error: () => this.router.navigate(['/productos'])
    });
  }

  guardar(producto: Omit<Producto, 'id'>) {
    this.mensajeExito = '';
    this.mensajeError = '';

    this.productosService.actualizarProducto(this.productoId, producto).subscribe({
      next: () => {
        this.mensajeExito = '¡Producto actualizado con éxito!';
        setTimeout(() => this.router.navigate(['/productos']), 2000);
      },
      error: (err) => {
        this.mensajeError = err.error?.message || 'Error al actualizar el producto.';
      }
    });
  }
}
