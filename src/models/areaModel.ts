// Áreas de la empresa (ej. Producción, Ventas)
export interface Area {
  id: number;
  name: string; // Nombre del área
  description?: string; // Detalle o funciones del área
  created_at?: Date;
}
