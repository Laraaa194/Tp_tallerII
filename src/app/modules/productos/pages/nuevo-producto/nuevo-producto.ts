import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-nuevo-producto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './nuevo-producto.html',
  styleUrl: './nuevo-producto.css'
})
export class NuevoProducto {
  private fb = inject(FormBuilder);
  private productosService = inject(ProductosService);
  private router = inject(Router);

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

  onSubmit() {
    this.enviado = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    if (this.form.invalid) return;

    this.productosService.crearProducto(this.form.value).subscribe({
      next: () => {
        this.mensajeExito = '¡Producto creado con éxito!';
        this.form.reset({ stock: 0, imagenUrl: '' });
        this.enviado = false;
        setTimeout(() => this.router.navigate(['/productos']), 2000);
      },
      error: (err) => {
        this.mensajeError = err.error?.message || 'Error al crear el producto.';
      }
    });
  }
}
