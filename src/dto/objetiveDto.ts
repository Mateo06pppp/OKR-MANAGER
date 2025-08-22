export interface ObjectiveDto {
  title: string;
  description?: string;
  startDate: string; // formato ISO
  endDate: string;   // formato ISO
  progress: number; // porcentaje de progreso
  areaId: number; // ID del área asociada
}
