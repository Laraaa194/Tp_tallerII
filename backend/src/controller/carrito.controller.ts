import type { Request, Response } from "express";
import { CarritoService } from "../service/carrito.service.js";

const service = new CarritoService();

export class CarritoController {

  async add(req: Request, res: Response) {
    try {
      const { productoId, cantidad } = req.body;
      const userId = (req as any).user.id;
      if (!userId) {
      res.status(401).json({ message: 'Debes estar logueado para agregar productos al carrito' });
      return;
    }
      const result = await service.addItem(Number(productoId), Number(cantidad), userId);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Error al agregar item al carrito' });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const userId = (req as any).user.id;
      if (!userId) {
      res.status(401).json({ message: 'Debes estar logueado para agregar productos al carrito' });
      return;
    }
      const result = await service.getAll(userId);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ message: error.message || 'Error al obtener el carrito' });
    }
  }

  async updateCantidad(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { cantidad } = req.body;
      const result = await service.updateCantidad(Number(id), Number(cantidad));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Error al actualizar cantidad' });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await service.removeItem(Number(id));
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ message: error.message || 'Error al eliminar item del carrito' });
    }
  }
}