import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-producto.html',
  styleUrl: './editar-producto.css'
})
export class EditarProducto implements OnInit {
  private fb = inject(FormBuilder);
  private productosService = inject(ProductosService);
  router = inject(Router);
  private route = inject(ActivatedRoute);

  productoId!: number;
  form: FormGroup = this.fb.group({
    nombre:        ['', [Validators.required, Validators.minLength(2)]],
    descripcion:   ['', [Validators.required, Validators.minLength(5)]],
    clasificacion: ['', Validators.required],
    precio:        [null, [Validators.required, Validators.min(0.01)]],
    stock:         [0,    [Validators.required, Validators.min(0)]],
    imagenUrl:     ['']
  });

  mensajeExito: string = '';
  mensajeError: string = '';
  enviado: boolean = false;

  get f() { return this.form.controls; }

  ngOnInit() {
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));
    this.productosService.getProductos().subscribe({
      next: (productos) => {
        const producto = productos.find(p => p.id === this.productoId);
        if (producto) {
          this.form.patchValue(producto);
        } else {
          this.router.navigate(['/productos']);
        }
      },
      error: () => this.router.navigate(['/productos'])
    });
  }

  onSubmit() {
    this.enviado = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    if (this.form.invalid) return;

    this.productosService.actualizarProducto(this.productoId, this.form.value).subscribe({
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
