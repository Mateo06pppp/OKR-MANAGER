import pool from '../config/config-db.js';
import type YearBudgetDtoT from '../dto/yearBudgetDto.js';
import type YearBudgetMonthDtoT from '../dto/yearBudgetMonthDto.js';

class YearBudgetService { 
  async getByStrategicYear(strategicYearId: number) {
    const [budgets] = await pool.query('SELECT * FROM year_budget WHERE strategic_year_id = ?', [strategicYearId]);
    const budget = (budgets as any[])[0];
    if (!budget) return null;
    const [months] = await pool.query('SELECT * FROM year_budget_month WHERE year_budget_id = ? ORDER BY month', [budget.id]);
    return { ...budget, months };
  }

  // create budget with optional months (months = [{month, amount}, ...])
  async createForYear(strategicYearId: number, dto: YearBudgetDtoT) {
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      const [res] = await conn.query(
        'INSERT INTO year_budget (strategic_year_id, total_amount) VALUES (?, ?)',
        [strategicYearId, dto.total_amount]
      );
      const budgetId = (res as any).insertId as number;
      if (dto.months && dto.months.length) {
        const inserts = dto.months.map(m => [budgetId, m.month, m.amount]);
        await conn.query('INSERT INTO year_budget_month (year_budget_id, month, amount) VALUES ?', [inserts]);
      }
      await conn.commit();
      return budgetId;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  async updateForYear(strategicYearId: number, dto: YearBudgetDtoT) {
    // find existing
    const [rows] = await pool.query('SELECT * FROM year_budget WHERE strategic_year_id = ?', [strategicYearId]);
    const existing = (rows as any[])[0];
    if (!existing) throw new Error('Budget not found for strategic year');
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();
      await conn.query('UPDATE year_budget SET total_amount = ? WHERE id = ?', [dto.total_amount, existing.id]);
      if (dto.months) {
        // simple upsert strategy: delete existing months and re-insert
        await conn.query('DELETE FROM year_budget_month WHERE year_budget_id = ?', [existing.id]);
        if (dto.months.length) {
          const inserts = dto.months.map(m => [existing.id, m.month, m.amount]);
          await conn.query('INSERT INTO year_budget_month (year_budget_id, month, amount) VALUES ?', [inserts]);
        }
      }
      await conn.commit();
      return existing.id;
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }
  }

  async deleteByStrategicYear(strategicYearId: number) {
    const [rows] = await pool.query('SELECT * FROM year_budget WHERE strategic_year_id = ?', [strategicYearId]);
    const existing = (rows as any[])[0];
    if (!existing) return 0;
    // months have FK ON DELETE CASCADE (if DB set), but to be safe:
    await pool.query('DELETE FROM year_budget_month WHERE year_budget_id = ?', [existing.id]);
    const [res] = await pool.query('DELETE FROM year_budget WHERE id = ?', [existing.id]);
    return (res as any).affectedRows as number;
  }
}
export const yearBudgetService = new YearBudgetService();