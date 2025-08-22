export default interface YearBudgetMonthDto {
  year_budget_id: number;
  month: number;
  amount: number;
  real_amount?: number; // optional, if not provided it will be calculated
}
