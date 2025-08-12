import pool from '../config/config-db.js';
import type StrategicYearDtoT from '../dto/strategicYearDto.js';

class StrategicYearService {
  async getAllByMega(megaId: number) {
    const [rows] = await pool.query('SELECT * FROM strategic_year WHERE mega_id = ? ORDER BY year', [megaId]);
    return rows as any[];
  }

  async getById(id: number) {
    const [rows] = await pool.query('SELECT * FROM strategic_year WHERE id = ?', [id]);
    return (rows as any[])[0] ?? null;
  }

  async create(megaId: number, dto: StrategicYearDtoT) {
    const [res] = await pool.query(
      'INSERT INTO strategic_year (mega_id, year, title, summary) VALUES (?, ?, ?, ?)',
      [megaId, dto.year, dto.title ?? null, dto.summary ?? null]
    );
    return (res as any).insertId as number;
  }

  async update(id: number, dto: Partial<StrategicYearDtoT>) {
    const sets: string[] = [];
    const vals: any[] = [];
    if (dto.year !== undefined) { sets.push('year = ?'); vals.push(dto.year); }
    if (dto.title !== undefined) { sets.push('title = ?'); vals.push(dto.title); }
    if (dto.summary !== undefined) { sets.push('summary = ?'); vals.push(dto.summary); }
    if (!sets.length) return 0;
    vals.push(id);
    const sql = `UPDATE strategic_year SET ${sets.join(', ')} WHERE id = ?`;
    const [res] = await pool.query(sql, vals);
    return (res as any).affectedRows as number;
  }

  async delete(id: number) {
    const [res] = await pool.query('DELETE FROM strategic_year WHERE id = ?', [id]);
    return (res as any).affectedRows as number;
  }
}
export const strategicYearService = new StrategicYearService();