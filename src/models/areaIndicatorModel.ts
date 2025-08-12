// Indicadores clave por área
export interface AreaIndicator {
  id: number;
  area_id: number; // FK -> Area.id
  key_name: string; // Nombre del indicador (ej. "Ventas Tapicería")
  value: string; // Valor en formato texto (ej. "$ 1.500.000")
  numeric_value?: number; // Valor numérico para cálculos
  unit?: string; // Unidad (ej. "COP", "unidades", "%")
  recorded_at?: Date; // Fecha en que se registró el indicador
  strategic_year_id?: number; // FK opcional -> StrategicYear.id
}
