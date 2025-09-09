// DTO para la tabla SubProject
export default interface SubProjectDto {
  idea: string;
  percentage_worked?: string;
  percentage_real_worked?: string;
  project_id: number;
  user_id?: number;
}
