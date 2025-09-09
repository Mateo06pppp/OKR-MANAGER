// Objetivos de gerencia para un año estratégico
export interface YearObjective {
  id: number;
  strategic_year_id: number; // FK -> StrategicYear.id
  title: string; // Nombre del objetivo
  description?: string; // Detalle del objetivo
  start_date?: Date; // Fecha de inicio
  end_date?: Date; // Fecha límite
  created_at?: Date;
  updated_at?: Date;
  area_id: number; // FK -> Area.id
  user_id: number; // FK -> User.id
}
