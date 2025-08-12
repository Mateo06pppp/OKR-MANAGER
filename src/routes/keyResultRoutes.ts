import express from 'express';

import {
  getAllKeyResults,
  createKeyResult,
  getKeyResultById,
  updateKeyResult,
  deleteKeyResult,
  addProgressUpdate,
  getProgressHistory
} from '../controller/keyResultController.js';

const router = express.Router();

// Resultados clave
router.get('/listar-krs', getAllKeyResults);
router.post('/create-krs', createKeyResult);
router.get('/detalle/krs/:id', getKeyResultById);
router.put('/actualizar/krs/:id', updateKeyResult);
router.delete('/eliminar/krs/:id', deleteKeyResult);

// Progreso
router.post('/agregar/krs/:id/progress', addProgressUpdate);
router.get('/obtener/krs/:id/progress', getProgressHistory);

export default router;