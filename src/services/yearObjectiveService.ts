import pool from '../config/config-db.js';
import type YearObjectiveDtoT from '../dto/yearObjectiveDto.js';

class YearObjectiveService {
  async getAllByYear(yearId: number) {
    const [rows] = await pool.query('SELECT * FROM year_objective WHERE strategic_year_id = ? ORDER BY id', [yearId]);
    return rows as any[];
  }

  async getById(id: number) {
    const [rows] = await pool.query('SELECT * FROM year_objective WHERE id = ?', [id]);
    return (rows as any[])[0] ?? null;
  }

  async create(yearId: number, dto: YearObjectiveDtoT) {
    const [res] = await pool.query(
      `INSERT INTO year_objective
       (strategic_year_id, title, description, owner, start_date, end_date)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [yearId, dto.title, dto.description ?? null, dto.owner ?? null, dto.start_date ?? null, dto.end_date ?? null]
    );
    return (res as any).insertId as number;
  }

  async update(id: number, dto: Partial<YearObjectiveDtoT>) {
    const sets: string[] = [];
    const vals: any[] = [];
    if (dto.title !== undefined) { sets.push('title = ?'); vals.push(dto.title); }
    if (dto.description !== undefined) { sets.push('description = ?'); vals.push(dto.description); }
    if (dto.owner !== undefined) { sets.push('owner = ?'); vals.push(dto.owner); }
    if (dto.start_date !== undefined) { sets.push('start_date = ?'); vals.push(dto.start_date); }
    if (dto.end_date !== undefined) { sets.push('end_date = ?'); vals.push(dto.end_date); }
    if (!sets.length) return 0;
    vals.push(id);
    const sql = `UPDATE year_objective SET ${sets.join(', ')} WHERE id = ?`;
    const [res] = await pool.query(sql, vals);
    return (res as any).affectedRows as number;
  }

  async delete(id: number) {
    const [res] = await pool.query('DELETE FROM year_objective WHERE id = ?', [id]);
    return (res as any).affectedRows as number;
  }
}
export const yearObjectiveService = new YearObjectiveService();
