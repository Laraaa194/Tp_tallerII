import { ItemCarrito } from "./ItemCarrito";

export interface CarritoItemResponse extends ItemCarrito {
  producto: {
    id: number;
    nombre: string;
    precio: number;
    stock: number;
    imagenUrl?: string;
    categoria?: string;
  };
}