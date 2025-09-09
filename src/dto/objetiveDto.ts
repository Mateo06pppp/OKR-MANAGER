export interface ObjectiveDto {
  user_id: number;
  title: string;
  description?: string;
  startDate: string; // formato ISO
  endDate: string;   // formato ISO
  progress: number; // porcentaje de progreso
  sub_project_id: number;
}
