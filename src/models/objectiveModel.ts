import type { ObjectiveDto } from '../dto/objetiveDto.js';
import db from '../config/config-db.js';

// Obtener todos los objetivos
export const getAllObjectives = async () => {
  const [rows] = await db.query('SELECT * FROM objectives');
  return rows;
};

// Obtener un objetivo por ID
export const getObjectiveById = async (id: number) => {
  const [rows] = await db.query('SELECT * FROM objectives WHERE id = ?', [id]);
  return (rows as any[])[0] || null;
};

// Crear un objetivo
export const createObjective = async (dto: ObjectiveDto) => {
  const [result] = await db.query('INSERT INTO objectives SET ?', [dto]);
  return result;
};

// Actualizar un objetivo
export const updateObjective = async (id: number, dto: ObjectiveDto) => {
  const [result] = await db.query('UPDATE objectives SET ? WHERE id = ?', [dto, id]);
  return result;
};

// Eliminar un objetivo
export const deleteObjective = async (id: number) => {
  const [result] = await db.query('DELETE FROM objectives WHERE id = ?', [id]);
  return result;
};
