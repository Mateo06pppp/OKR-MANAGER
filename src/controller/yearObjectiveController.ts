import type { Request, Response } from 'express';
import { yearObjectiveService } from '../services/yearObjectiveService.js';


export class YearObjectiveController {
  async listByYear(req: Request, res: Response) {
    try {
      const yearId = Number(req.params.yearId);
      const data = await yearObjectiveService.getAllByYear(yearId);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await yearObjectiveService.getById(id);
      if (!data) return res.status(404).json({ message: 'Not found' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const yearId = Number(req.params.yearId);
      const id = await yearObjectiveService.create(yearId, req.body);
      res.status(201).json({ id });
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const affected = await yearObjectiveService.update(id, req.body);
      if (!affected) return res.status(404).json({ message: 'Not found or nothing to update' });
      res.json({ message: 'Updated' });
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const affected = await yearObjectiveService.delete(id);
      if (!affected) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }
}