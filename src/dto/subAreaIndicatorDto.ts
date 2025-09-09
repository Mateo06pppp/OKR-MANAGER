// DTO para la tabla SubAreaIndicator
export default interface SubAreaIndicatorDto {
  key_name: string;
  value: string;
  numeric_value?: number;
  unit?: string;
  recorded_at?: string;
  area_indicator_id: number;
}
