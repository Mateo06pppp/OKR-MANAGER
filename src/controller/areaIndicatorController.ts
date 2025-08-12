import type { Request, Response } from 'express';
import { areaIndicatorService } from '../services/areaIndicatorService.js';


export class AreaIndicatorController {
  async listByArea(req: Request, res: Response) {
    try {
      const areaId = Number(req.params.areaId);
      const year = req.query.year ? Number(req.query.year) : undefined;
      const data = await areaIndicatorService.getAllByArea(areaId, year);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await areaIndicatorService.getById(id);
      if (!data) return res.status(404).json({ message: 'Not found' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const areaId = Number(req.params.areaId);
      const id = await areaIndicatorService.create(areaId, req.body);
      res.status(201).json({ id });
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const affected = await areaIndicatorService.update(id, req.body);
      if (!affected) return res.status(404).json({ message: 'Not found or nothing to update' });
      res.json({ message: 'Updated' });
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const affected = await areaIndicatorService.delete(id);
      if (!affected) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }
}