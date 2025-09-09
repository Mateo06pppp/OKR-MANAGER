import type { Request, Response } from "express";
import { subAreaIndicatorService } from "../services/subAreaIndicatorService.js";
import type SubAreaIndicatorDto from "../dto/subAreaIndicatorDto.js";

class SubAreaIndicatorController {
  async getAll(req: Request, res: Response) {
    res.json(await subAreaIndicatorService.getAll());
  }

  async getById(req: Request, res: Response) {
    const indicator = await subAreaIndicatorService.getById(Number(req.params.id));
    if (!indicator) return res.status(404).json({ message: "SubIndicador no encontrado" });
    res.json(indicator);
  }

  async create(req: Request, res: Response) {
    const dto: SubAreaIndicatorDto = req.body;
    const id = await subAreaIndicatorService.create(dto);
    res.status(201).json({ id });
  }

  async update(req: Request, res: Response) {
    const dto: Partial<SubAreaIndicatorDto> = req.body;
    await subAreaIndicatorService.update(Number(req.params.id), dto);
    res.json({ message: "SubIndicador actualizado" });
  }

  async delete(req: Request, res: Response) {
    await subAreaIndicatorService.delete(Number(req.params.id));
    res.json({ message: "SubIndicador eliminado" });
  }
}

export default new SubAreaIndicatorController();
