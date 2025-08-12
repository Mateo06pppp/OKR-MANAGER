import pool from '../config/config-db.js';
import type YearBudgetMonthDtoT from '../dto/yearBudgetMonthDto.js';

class YearBudgetMonthService {
  async getAllByBudget(budgetId: number) {
    const [rows] = await pool.query('SELECT * FROM year_budget_month WHERE year_budget_id = ? ORDER BY month', [budgetId]);
    return rows as any[];
  }

  async getById(id: number) {
    const [rows] = await pool.query('SELECT * FROM year_budget_month WHERE id = ?', [id]);
    return (rows as any[])[0] ?? null;
  }

  async create(dto: YearBudgetMonthDtoT) {
    const [res] = await pool.query(
      'INSERT INTO year_budget_month (year_budget_id, month, amount) VALUES (?, ?, ?)',
      [dto.year_budget_id, dto.month, dto.amount]
    );
    return (res as any).insertId as number;
  }

  async update(id: number, dto: Partial<YearBudgetMonthDtoT>) {
    const sets: string[] = [];
    const vals: any[] = [];
    if (dto.month !== undefined) { sets.push('month = ?'); vals.push(dto.month); }
    if (dto.amount !== undefined) { sets.push('amount = ?'); vals.push(dto.amount); }
    if (dto.year_budget_id !== undefined) { sets.push('year_budget_id = ?'); vals.push(dto.year_budget_id); }
    if (!sets.length) return 0;
    vals.push(id);
    const sql = `UPDATE year_budget_month SET ${sets.join(', ')} WHERE id = ?`;
    const [res] = await pool.query(sql, vals);
    return (res as any).affectedRows as number;
  }

  async delete(id: number) {
    const [res] = await pool.query('DELETE FROM year_budget_month WHERE id = ?', [id]);
    return (res as any).affectedRows as number;
  }
}
export const yearBudgetMonthService = new YearBudgetMonthService();