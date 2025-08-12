import type { Request, Response } from 'express';
import { megaService }  from '../services/megaService.js';

export class MegaController {
  async list(req: Request, res: Response) {
    try {
      const data = await megaService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error listing megas', error: String(err) });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await megaService.getById(id);
      if (!data) return res.status(404).json({ message: 'Mega not found' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error getting mega', error: String(err) });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const id = await megaService.create(req.body);
      res.status(201).json({ id });
    } catch (err) {
      res.status(500).json({ message: 'Error creating mega', error: String(err) });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const affected = await megaService.update(id, req.body);
      if (!affected) return res.status(404).json({ message: 'Mega not found or nothing to update' });
      res.json({ message: 'Updated' });
    } catch (err) {
      res.status(500).json({ message: 'Error updating mega', error: String(err) });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const affected = await megaService.delete(id);
      if (!affected) return res.status(404).json({ message: 'Mega not found' });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error deleting mega', error: String(err) });
    }
  }
}