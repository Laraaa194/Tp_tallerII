import { Component, EventEmitter, Input, Output, inject, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.css'
})
export class ProductoForm implements OnChanges {
  private fb = inject(FormBuilder);

  @Input() valorInicial: Producto | null = null;
  @Input() textoBoton: string = 'Guardar';
  @Input() mostrarCancelar: boolean = false;
  @Output() enviar = new EventEmitter<Omit<Producto, 'id'>>();
  @Output() cancelar = new EventEmitter<void>();

  form: FormGroup = this.fb.group({
    nombre:        ['', [Validators.required, Validators.minLength(2)]],
    descripcion:   ['', [Validators.required, Validators.minLength(5)]],
    clasificacion: ['', Validators.required],
    precio:        [null, [Validators.required, Validators.min(0.01)]],
    stock:         [0,    [Validators.required, Validators.min(0)]],
    imagenUrl:     ['']
  });

  enviado: boolean = false;

  get f() { return this.form.controls; }

  ngOnChanges() {
    if (this.valorInicial) {
      this.form.patchValue(this.valorInicial);
    }
  }

  onSubmit() {
    this.enviado = true;
    if (this.form.invalid) return;
    this.enviar.emit(this.form.value);
  }
}
