import type { Request, Response } from 'express';
import { strategicYearService } from '../services/strategicYearService.js';


export class StrategicYearController {
  async listByMega(req: Request, res: Response) {
    try {
      const megaId = Number(req.params.megaId);
      const data = await strategicYearService.getAllByMega(megaId);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await strategicYearService.getById(id);
      if (!data) return res.status(404).json({ message: 'Not found' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const megaId = Number(req.params.megaId);
      const id = await strategicYearService.create(megaId, req.body);
      res.status(201).json({ id });
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const affected = await strategicYearService.update(id, req.body);
      if (!affected) return res.status(404).json({ message: 'Not found or nothing to update' });
      res.json({ message: 'Updated' });
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const affected = await strategicYearService.delete(id);
      if (!affected) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }
}