import express from 'express';
import {
  getAllObjectives,
  createObjective,
  getObjectiveById,
  updateObjective,
  deleteObjective
} from '../controller/objectiveController.js';


const router = express.Router();

// Objetivos
router.get('/listar-okrs', getAllObjectives);
router.post('/crear-okrs', createObjective);
router.get('/detalle/okrs/:id', getObjectiveById);
router.put('/actualizar/okrs/:id', updateObjective);
router.delete('/eliminar/okrs/:id', deleteObjective);

export default router;