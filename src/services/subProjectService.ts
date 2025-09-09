import pool from "../config/config-db.js";
import type SubProjectDto from "../dto/subProjectDto.js";

class SubProjectService {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM sub_project");
    return rows as any[];
  }

  async getById(id: number) {
    const [rows] = await pool.query("SELECT * FROM sub_project WHERE id = ?", [id]);
    return (rows as any[])[0] ?? null;
  }

  async create(dto: SubProjectDto) {
    const [res] = await pool.query(
      `INSERT INTO sub_project 
        (idea, percentage_worked, percentage_real_worked, project_id, user_id) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        dto.idea,
        dto.percentage_worked ?? null,
        dto.percentage_real_worked ?? null,
        dto.project_id,
        dto.user_id ?? null,
      ]
    );
    return (res as any).insertId as number;
  }

  async update(id: number, dto: Partial<SubProjectDto>) {
    const sets: string[] = [];
    const vals: any[] = [];

    if (dto.idea !== undefined) { sets.push("idea = ?"); vals.push(dto.idea); }
    if (dto.percentage_worked !== undefined) { sets.push("percentage_worked = ?"); vals.push(dto.percentage_worked); }
    if (dto.percentage_real_worked !== undefined) { sets.push("percentage_real_worked = ?"); vals.push(dto.percentage_real_worked); }
    if (dto.project_id !== undefined) { sets.push("project_id = ?"); vals.push(dto.project_id); }
    if (dto.user_id !== undefined) { sets.push("user_id = ?"); vals.push(dto.user_id); }

    if (!sets.length) return 0;

    vals.push(id);
    const sql = `UPDATE sub_project SET ${sets.join(", ")} WHERE id = ?`;
    const [res] = await pool.query(sql, vals);
    return (res as any).affectedRows as number;
  }

  async delete(id: number) {
    const [res] = await pool.query("DELETE FROM sub_project WHERE id = ?", [id]);
    return (res as any).affectedRows as number;
  }
}

export const subProjectService = new SubProjectService();
