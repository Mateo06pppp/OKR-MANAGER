export default interface YearBudgetDto {
  total_amount: number;
  real_amount: number;
  months?: { month: number; amount: number }[]; // optional monthly breakdown
}