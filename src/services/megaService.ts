import pool from '../config/config-db.js';
import type MegaDto from '../dto/megaDto.js';

class MegaService {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM mega ORDER BY id DESC');
    return rows as any[];
  }

  async getById(id: number) {
    const [rows] = await pool.query('SELECT * FROM mega WHERE id = ?', [id]);
    const arr = rows as any[];
    return arr[0] ?? null;
  }

  async create(dto: MegaDto) {
    const duration = dto.duration_years ?? 10;
    const [res] = await pool.query(
      'INSERT INTO mega (title, description, start_year, duration_years) VALUES (?, ?, ?, ?)',
      [dto.title, dto.description ?? null, dto.start_year, duration]
    );
    return (res as any).insertId as number;
  }

  async update(id: number, dto: Partial<MegaDto>) {
    const fields: any[] = [];
    const sets: string[] = [];
    if (dto.title !== undefined) { sets.push('title = ?'); fields.push(dto.title); }
    if (dto.description !== undefined) { sets.push('description = ?'); fields.push(dto.description); }
    if (dto.start_year !== undefined) { sets.push('start_year = ?'); fields.push(dto.start_year); }
    if (dto.duration_years !== undefined) { sets.push('duration_years = ?'); fields.push(dto.duration_years); }

    if (sets.length === 0) return 0;
    fields.push(id);
    const sql = `UPDATE mega SET ${sets.join(', ')} WHERE id = ?`;
    const [res] = await pool.query(sql, fields);
    return (res as any).affectedRows as number;
  }

  async delete(id: number) {
    const [res] = await pool.query('DELETE FROM mega WHERE id = ?', [id]);
    return (res as any).affectedRows as number;
  }
}
export const megaService = new MegaService();