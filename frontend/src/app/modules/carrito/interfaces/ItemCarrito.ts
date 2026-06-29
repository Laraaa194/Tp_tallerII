export interface ItemCarrito {
  productoId: string;
  nombre: string;
  precio: number;
  cantidad: number;
  stock: number;
  imagenUrl?: string;
  categoria?: string;
}