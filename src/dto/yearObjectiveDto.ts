export default interface YearObjectiveDto {
  strategic_year_id: number;
  title: string;
  description?: string;
  start_date?: string; // ISO date string
  end_date?: string;   // ISO date string
  area_id: number;
  user_id: number;
}
