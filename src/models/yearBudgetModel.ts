// Presupuesto anual
export interface YearBudget {
  id: number;
  strategic_year_id: number; // FK único -> StrategicYear.id
  total_amount: number; // Monto total anual
  created_at?: Date;
  updated_at?: Date;
}
