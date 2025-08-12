// Representa la visión de largo plazo de la empresa (Mega)
export interface Mega {
  id: number; // Identificador único de la Mega
  title: string; // Nombre o título de la Mega (ej. "Duplicar ventas internacionales")
  description?: string; // Descripción detallada de la Mega
  start_year: number; // Año de inicio (ej. 2025)
  duration_years: number; // Duración en años (por defecto 10)
  created_at?: Date; // Fecha de creación del registro
  updated_at?: Date; // Fecha de última actualización
}
