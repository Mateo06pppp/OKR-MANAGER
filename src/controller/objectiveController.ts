import type { Request, Response } from 'express';
import * as service from '../services/objectiveService.js';

export const getAllObjectives = async (_req: Request, res: Response) => {
  res.json(await service.getAll());
};

export const getObjectiveById = async (req: Request, res: Response) => {
  const data = await service.getById(Number(req.params.id));
  if (!data) return res.status(404).json({ message: 'Objective not found' });
  res.json(data);
};

export const createObjective = async (req: Request, res: Response) => {
  await service.create(req.body);
  res.status(201).json({ message: 'Objective created' });
};

export const updateObjective = async (req: Request, res: Response) => {
  await service.update(Number(req.params.id), req.body);
  res.json({ message: 'Objective updated' });
};

export const deleteObjective = async (req: Request, res: Response) => {
  await service.remove(Number(req.params.id));
  res.json({ message: 'Objective deleted' });
};
