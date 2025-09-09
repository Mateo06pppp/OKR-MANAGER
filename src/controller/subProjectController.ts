import type { Request, Response } from "express";
import { subProjectService } from "../services/subProjectService.js";
import type SubProjectDto from "../dto/subProjectDto.js";

class SubProjectController {
  async getAll(req: Request, res: Response) {
    res.json(await subProjectService.getAll());
  }

  async getById(req: Request, res: Response) {
    const subProject = await subProjectService.getById(Number(req.params.id));
    if (!subProject) return res.status(404).json({ message: "SubProyecto no encontrado" });
    res.json(subProject);
  }

  async create(req: Request, res: Response) {
    const dto: SubProjectDto = req.body;
    const id = await subProjectService.create(dto);
    res.status(201).json({ id });
  }

  async update(req: Request, res: Response) {
    const dto: Partial<SubProjectDto> = req.body;
    await subProjectService.update(Number(req.params.id), dto);
    res.json({ message: "SubProyecto actualizado" });
  }

  async delete(req: Request, res: Response) {
    await subProjectService.delete(Number(req.params.id));
    res.json({ message: "SubProyecto eliminado" });
  }
}

export default new SubProjectController();
