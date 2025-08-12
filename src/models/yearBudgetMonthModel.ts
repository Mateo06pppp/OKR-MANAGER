// Desglose mensual del presupuesto
export interface YearBudgetMonth {
  id: number;
  year_budget_id: number; // FK -> YearBudget.id
  month: number; // Mes (1 a 12)
  amount: number; // Monto asignado para el mes
}
