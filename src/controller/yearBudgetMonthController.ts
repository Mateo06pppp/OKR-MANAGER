import type { Request, Response } from 'express';
import { yearBudgetMonthService } from '../services/yearBudgetMonthService.js';


export class YearBudgetMonthController {
  async listByBudget(req: Request, res: Response) {
    try {
      const budgetId = Number(req.params.budgetId);
      const data = await yearBudgetMonthService.getAllByBudget(budgetId);
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const data = await yearBudgetMonthService.getById(id);
      if (!data) return res.status(404).json({ message: 'Not found' });
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const id = await yearBudgetMonthService.create(req.body);
      res.status(201).json({ id });
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const affected = await yearBudgetMonthService.update(id, req.body);
      if (!affected) return res.status(404).json({ message: 'Not found or nothing to update' });
      res.json({ message: 'Updated' });
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const affected = await yearBudgetMonthService.delete(id);
      if (!affected) return res.status(404).json({ message: 'Not found' });
      res.json({ message: 'Deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Error', error: String(err) });
    }
  }
}