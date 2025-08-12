import type { Request, Response } from 'express';
import { yearBudgetService } from '../services/yearBudgetService.js';


export class YearBudgetController {
  async getByStrategicYear(req: Request, res: Response) {
    try {
      const yearId = Number(req.params.yearId);
      const data = await yearBudgetService.getByStrategicYear(yearId);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async createForYear(req: Request, res: Response) {
    try {
      const yearId = Number(req.params.yearId);
      const id = await yearBudgetService.createForYear(yearId, req.body);
      res.status(201).json({ id });
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async updateForYear(req: Request, res: Response) {
    try {
      const yearId = Number(req.params.yearId);
      const id = await yearBudgetService.updateForYear(yearId, req.body);
      res.json({ id, message: 'Updated' });
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async deleteByStrategicYear(req: Request, res: Response) {
    try {
      const yearId = Number(req.params.yearId);
      const affected = await yearBudgetService.deleteByStrategicYear(yearId);
      if (!affected) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }
}