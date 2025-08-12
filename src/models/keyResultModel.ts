import type { KeyResultDto } from '../dto/keyResultDto.js';
import type { ProgressDto } from '../dto/progressDto.js';
import db from '../config/config-db.js';

// Obtener todos los Key Results
export const getAllKeyResults = async () => {
  const [rows] = await db.query('SELECT * FROM key_results');
  return rows;
};

// Obtener un Key Result por ID
export const getKeyResultById = async (id: number) => {
  const [rows] = await db.query('SELECT * FROM key_results WHERE id = ?', [id]);
  return (rows as any[])[0] || null;
};

// Crear un Key Result
export const createKeyResult = async (dto: KeyResultDto) => {
  const [result] = await db.query('INSERT INTO key_results SET ?', [dto]);
  return result;
};

// Actualizar un Key Result
export const updateKeyResult = async (id: number, dto: KeyResultDto) => {
  const [result] = await db.query('UPDATE key_results SET ? WHERE id = ?', [dto, id]);
  return result;
};

// Eliminar un Key Result
export const deleteKeyResult = async (id: number) => {
  const [result] = await db.query('DELETE FROM key_results WHERE id = ?', [id]);
  return result;
};

// Agregar progreso a un Key Result
export const addProgressUpdate = async (krId: number, dto: ProgressDto) => {
  const [result] = await db.query('INSERT INTO progress_updates SET ?', [{ key_result_id: krId, ...dto }]);
  return result;
};

// Obtener historial de progreso
export const getProgressHistory = async (krId: number) => {
  const [rows] = await db.query('SELECT * FROM progress_updates WHERE key_result_id = ? ORDER BY update_date DESC', [krId]);
  return rows;
};
