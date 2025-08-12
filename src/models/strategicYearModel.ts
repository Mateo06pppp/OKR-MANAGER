// Año estratégico vinculado a una Mega
export interface StrategicYear {
  id: number; // ID único del año estratégico
  mega_id: number; // FK -> Mega.id (a qué Mega pertenece)
  year: number; // Año específico (ej. 2026)
  title?: string; // Título opcional para el año
  summary?: string; // Resumen de objetivos del año
  created_at?: Date;
  updated_at?: Date;
}
