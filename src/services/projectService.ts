import pool from "../config/config-db.js";
import type ProjectDto from "../dto/projectDto.js";

class ProjectService {
  async getAll() {
    const [rows] = await pool.query("SELECT * FROM project");
    return rows as any[];
  }

  async getById(id: number) {
    const [rows] = await pool.query("SELECT * FROM project WHERE id = ?", [id]);
    return (rows as any[])[0] ?? null;
  }

  async create(dto: ProjectDto) {
    const [res] = await pool.query(
      `INSERT INTO project 
        (idea, strategic_year_id, percentage_worked, percentage_real_worked, responsible_user, year_objective_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        dto.idea,
        dto.strategic_year_id,
        dto.percentage_worked ?? null,
        dto.percentage_real_worked ?? null,
        dto.responsible_user ?? null,
        dto.year_objective_id ?? null
      ]
    );
    return (res as any).insertId as number;
  }

  async update(id: number, dto: Partial<ProjectDto>) {
    const sets: string[] = [];
    const vals: any[] = [];

    if (dto.idea !== undefined) { sets.push("idea = ?"); vals.push(dto.idea); }
    if (dto.strategic_year_id !== undefined) { sets.push("strategic_year_id = ?"); vals.push(dto.strategic_year_id); }
    if (dto.percentage_worked !== undefined) { sets.push("percentage_worked = ?"); vals.push(dto.percentage_worked); }
    if (dto.percentage_real_worked !== undefined) { sets.push("percentage_real_worked = ?"); vals.push(dto.percentage_real_worked); }
    if (dto.responsible_user !== undefined) { sets.push("responsible_user = ?"); vals.push(dto.responsible_user); }
    if (dto.year_objective_id !== undefined) { sets.push("year_objective_id = ?"); vals.push(dto.year_objective_id); }

    if (!sets.length) return 0;

    vals.push(id);
    const sql = `UPDATE project SET ${sets.join(", ")} WHERE id = ?`;
    const [res] = await pool.query(sql, vals);
    return (res as any).affectedRows as number;
  }

  async delete(id: number) {
    const [res] = await pool.query("DELETE FROM project WHERE id = ?", [id]);
    return (res as any).affectedRows as number;
  }
}

export const projectService = new ProjectService();
