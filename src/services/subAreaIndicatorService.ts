import pool from "../config/config-db.js";
import type SubAreaIndicatorDto from "../dto/subAreaIndicatorDto.js";

class SubAreaIndicatorService {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM sub_area_indicator");
    return rows as any[];
  }

  async getById(id: number) {
    const [rows] = await pool.query("SELECT * FROM sub_area_indicator WHERE id = ?", [id]);
    return (rows as any[])[0] ?? null;
  }

  async create(dto: SubAreaIndicatorDto) {
    const [res] = await pool.query(
      `INSERT INTO sub_area_indicator 
        (key_name, value, numeric_value, unit, recorded_at, area_indicator_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        dto.key_name,
        dto.value,
        dto.numeric_value ?? null,
        dto.unit ?? null,
        dto.recorded_at ?? new Date(),
        dto.area_indicator_id,
      ]
    );
    return (res as any).insertId as number;
  }

  async update(id: number, dto: Partial<SubAreaIndicatorDto>) {
    const sets: string[] = [];
    const vals: any[] = [];

    if (dto.key_name !== undefined) { sets.push("key_name = ?"); vals.push(dto.key_name); }
    if (dto.value !== undefined) { sets.push("value = ?"); vals.push(dto.value); }
    if (dto.numeric_value !== undefined) { sets.push("numeric_value = ?"); vals.push(dto.numeric_value); }
    if (dto.unit !== undefined) { sets.push("unit = ?"); vals.push(dto.unit); }
    if (dto.recorded_at !== undefined) { sets.push("recorded_at = ?"); vals.push(dto.recorded_at); }
    if (dto.area_indicator_id !== undefined) { sets.push("area_indicator_id = ?"); vals.push(dto.area_indicator_id); }

    if (!sets.length) return 0;

    vals.push(id);
    const sql = `UPDATE sub_area_indicator SET ${sets.join(", ")} WHERE id = ?`;
    const [res] = await pool.query(sql, vals);
    return (res as any).affectedRows as number;
  }

  async delete(id: number) {
    const [res] = await pool.query("DELETE FROM sub_area_indicator WHERE id = ?", [id]);
    return (res as any).affectedRows as number;
  }
}

export const subAreaIndicatorService = new SubAreaIndicatorService();
