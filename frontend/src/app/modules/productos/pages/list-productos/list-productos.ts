import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProductoCard } from '../../components/producto-card/producto-card';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-list-productos',
  imports: [ProductoCard], 
  templateUrl: './list-productos.html',
  styleUrl: './list-productos.css',
})
export class ListProductos implements OnInit {
  public productosService = inject(ProductosService);
   private destroyRef = inject(DestroyRef);
  private searchSubject = new Subject<string>();
  mensajeError = '';

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(400),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(termino => {
      this.productosService.cargarProductos(termino);
    });
    
    this.productosService.cargarProductos('');
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }
}