import * as model from '../models/objectiveModel.js';
import type { ObjectiveDto } from '../dto/objetiveDto.js';

export const getAll = () => model.getAllObjectives();
export const getById = (id: number) => model.getObjectiveById(id);
export const create = (dto: ObjectiveDto) => model.createObjective(dto);
export const update = (id: number, dto: ObjectiveDto) => model.updateObjective(id, dto);
export const remove = (id: number) => model.deleteObjective(id);
