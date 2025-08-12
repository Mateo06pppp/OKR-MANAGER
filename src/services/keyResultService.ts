import * as model from '../models/keyResultModel.js';
import type { KeyResultDto } from '../dto/keyResultDto.js';
import type { ProgressDto } from '../dto/progressDto.js';

export const getAll = () => model.getAllKeyResults();
export const getById = (id: number) => model.getKeyResultById(id);
export const create = (dto: KeyResultDto) => model.createKeyResult(dto);
export const update = (id: number, dto: KeyResultDto) => model.updateKeyResult(id, dto);
export const remove = (id: number) => model.deleteKeyResult(id);

// Progreso
export const addProgress = (id: number, dto: ProgressDto) => model.addProgressUpdate(id, dto);
export const getProgressHistory = (id: number) => model.getProgressHistory(id);
