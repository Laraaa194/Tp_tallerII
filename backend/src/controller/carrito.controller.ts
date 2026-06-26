import type { Request, Response } from "express";
import { CarritoService } from "../service/carrito.service.js";

const service = new CarritoService();

export class CarritoController {

  async add(req: Request, res: Response) {
    const { productoId, cantidad } = req.body;
    const result = await service.addItem(
      Number(productoId),
      Number(cantidad)
    );
    res.json(result);
  }

  async getAll(req: Request, res: Response) {
    const result = await service.getAll();
    res.json(result);
  }

}