export default interface YearObjectiveDto {
  title: string;
  description?: string;
  owner?: string;
  start_date?: string; // ISO date string
  end_date?: string;   // ISO date string
}
