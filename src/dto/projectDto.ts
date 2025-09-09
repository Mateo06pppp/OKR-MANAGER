// DTO para la tabla Project
export default interface ProjectDto {
  idea: string;
  strategic_year_id: number;
  percentage_worked?: string;
  percentage_real_worked?: string;
  responsible_user?: number;
  year_objective_id?: number;
}
