import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { ProductosService } from '../../services/productos.service';
import { ProductoCard } from '../../components/producto-card/producto-card';
import { Producto } from '../../interfaces/producto';

@Component({
  selector: 'app-list-productos',
  imports: [ProductoCard , AsyncPipe],
  templateUrl: './list-productos.html',
  styleUrl: './list-productos.css',
})
export class ListProductos implements OnInit {

  private productosService = inject(ProductosService);
  private destroyRef = inject(DestroyRef);
  public productos$!: Observable<Producto[]>;
  searchSubject = new Subject<string>();

  mensajeError = '';


 ngOnInit() {
  this.productos$ = this.searchSubject.pipe(
    startWith(''), 
    debounceTime(400),
    //distinctUntilChanged(),
    switchMap(termino => this.productosService.buscarProductos(termino)),
    takeUntilDestroyed(this.destroyRef)
  );
 }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  recargarProductos() {
  this.searchSubject.next('');
}
}
