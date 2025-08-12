import pool from '../config/config-db.js';
import type AreaIndicatorDtoT from '../dto/areaIndicatorDto.js';

class AreaIndicatorService {
  async getAllByArea(areaId: number, strategicYearId?: number) {
    const vals: any[] = [areaId];
    let sql = 'SELECT * FROM area_indicator WHERE area_id = ?';
    if (strategicYearId !== undefined && strategicYearId !== null) {
      sql += ' AND strategic_year_id = ?';
      vals.push(strategicYearId);
    }
    sql += ' ORDER BY recorded_at DESC';
    const [rows] = await pool.query(sql, vals);
    return rows as any[];
  }

  async getById(id: number) {
    const [rows] = await pool.query('SELECT * FROM area_indicator WHERE id = ?', [id]);
    return (rows as any[])[0] ?? null;
  }

  async create(areaId: number, dto: AreaIndicatorDtoT) {
    const [res] = await pool.query(
      `INSERT INTO area_indicator
       (area_id, key_name, value, numeric_value, unit, strategic_year_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [areaId, dto.key_name, dto.value, dto.numeric_value ?? null, dto.unit ?? null, dto.strategic_year_id ?? null]
    );
    return (res as any).insertId as number;
  }

  async update(id: number, dto: Partial<AreaIndicatorDtoT>) {
    const sets: string[] = [];
    const vals: any[] = [];
    if (dto.key_name !== undefined) { sets.push('key_name = ?'); vals.push(dto.key_name); }
    if (dto.value !== undefined) { sets.push('value = ?'); vals.push(dto.value); }
    if (dto.numeric_value !== undefined) { sets.push('numeric_value = ?'); vals.push(dto.numeric_value); }
    if (dto.unit !== undefined) { sets.push('unit = ?'); vals.push(dto.unit); }
    if (dto.strategic_year_id !== undefined) { sets.push('strategic_year_id = ?'); vals.push(dto.strategic_year_id); }
    if (!sets.length) return 0;
    vals.push(id);
    const sql = `UPDATE area_indicator SET ${sets.join(', ')} WHERE id = ?`;
    const [res] = await pool.query(sql, vals);
    return (res as any).affectedRows as number;
  }

  async delete(id: number) {
    const [res] = await pool.query('DELETE FROM area_indicator WHERE id = ?', [id]);
    return (res as any).affectedRows as number;
  }
}
export const areaIndicatorService = new AreaIndicatorService();