import pool from '../config/config-db.js';
import type AreaDtoT from '../dto/areaDto.js';

class AreaService {
  async getAll() {
    const [rows] = await pool.query('SELECT * FROM area ORDER BY id');
    return rows as any[];
  }

  async getById(id: number) {
    const [rows] = await pool.query('SELECT * FROM area WHERE id = ?', [id]);
    return (rows as any[])[0] ?? null;
  }

  async create(dto: AreaDtoT) {
    const [res] = await pool.query('INSERT INTO area (name, description) VALUES (?, ?)', [dto.name, dto.description ?? null]);
    return (res as any).insertId as number;
  }

  async update(id: number, dto: Partial<AreaDtoT>) {
    const sets: string[] = [];
    const vals: any[] = [];
    if (dto.name !== undefined) { sets.push('name = ?'); vals.push(dto.name); }
    if (dto.description !== undefined) { sets.push('description = ?'); vals.push(dto.description); }
    if (!sets.length) return 0;
    vals.push(id);
    const sql = `UPDATE area SET ${sets.join(', ')} WHERE id = ?`;
    const [res] = await pool.query(sql, vals);
    return (res as any).affectedRows as number;
  }

  async delete(id: number) {
    const [res] = await pool.query('DELETE FROM area WHERE id = ?', [id]);
    return (res as any).affectedRows as number;
  }
}
export const areaService = new AreaService();