import type { Request, Response } from "express";
import { projectService } from "../services/projectService.js";
import type ProjectDto from "../dto/projectDto.js";

class ProjectController {
  async getAll(req: Request, res: Response) {
    res.json(await projectService.getAll());
  }

  async getById(req: Request, res: Response) {
    const project = await projectService.getById(Number(req.params.id));
    if (!project) return res.status(404).json({ message: "Proyecto no encontrado" });
    res.json(project);
  }

  async create(req: Request, res: Response) {
    const dto: ProjectDto = req.body;
    const id = await projectService.create(dto);
    res.status(201).json({ id });
  }

  async update(req: Request, res: Response) {
    const dto: Partial<ProjectDto> = req.body;
    await projectService.update(Number(req.params.id), dto);
    res.json({ message: "Proyecto actualizado" });
  }

  async delete(req: Request, res: Response) {
    await projectService.delete(Number(req.params.id));
    res.json({ message: "Proyecto eliminado" });
  }
}

export default new ProjectController();
