import { Router } from 'express';
import { YearObjectiveController } from '../controller/yearObjectiveController.js';

const yearObjectiveRouter = Router();

const yearObjectiveController = new YearObjectiveController();

yearObjectiveRouter.get('/listar/year/:yearId', yearObjectiveController.listByYear.bind(yearObjectiveController));
yearObjectiveRouter.get('/detalle/:id', yearObjectiveController.get.bind(yearObjectiveController));
yearObjectiveRouter.post('/crear/year/:yearId', yearObjectiveController.create.bind(yearObjectiveController));
yearObjectiveRouter.put('/actualizar/:id', yearObjectiveController.update.bind(yearObjectiveController));
yearObjectiveRouter.delete('/eliminar/:id', yearObjectiveController.remove.bind(yearObjectiveController));


export default yearObjectiveRouter;