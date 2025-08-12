import type { Request, Response } from 'express';
import * as service from '../services/keyResultService.js';

export const getAllKeyResults = async (_req: Request, res: Response) => {
  res.json(await service.getAll());
};

export const getKeyResultById = async (req: Request, res: Response) => {
  const data = await service.getById(Number(req.params.id));
  if (!data) return res.status(404).json({ message: 'Key Result not found' });
  res.json(data);
};

export const createKeyResult = async (req: Request, res: Response) => {
  await service.create(req.body);
  res.status(201).json({ message: 'Key Result created' });
};

export const updateKeyResult = async (req: Request, res: Response) => {
  await service.update(Number(req.params.id), req.body);
  res.json({ message: 'Key Result updated' });
};

export const deleteKeyResult = async (req: Request, res: Response) => {
  await service.remove(Number(req.params.id));
  res.json({ message: 'Key Result deleted' });
};

// Progreso
export const addProgressUpdate = async (req: Request, res: Response) => {
  await service.addProgress(Number(req.params.id), req.body);
  res.status(201).json({ message: 'Progress update added' });
};

export const getProgressHistory = async (req: Request, res: Response) => {
  res.json(await service.getProgressHistory(Number(req.params.id)));
};
