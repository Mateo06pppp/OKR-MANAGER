import { Router } from 'express';
import { YearBudgetController } from '../controller/yearBudgetController.js';

const yearBudgetRouter = Router();

const yearBudgetController = new YearBudgetController();

yearBudgetRouter.get('/obtener/year/:yearId', yearBudgetController.getByStrategicYear.bind(yearBudgetController));
yearBudgetRouter.post('/crear/year/:yearId', yearBudgetController.createForYear.bind(yearBudgetController));
yearBudgetRouter.put('/actualizar/year/:yearId', yearBudgetController.updateForYear.bind(yearBudgetController));
yearBudgetRouter.delete('/eliminar/year/:yearId', yearBudgetController.deleteByStrategicYear.bind(yearBudgetController));

export default yearBudgetRouter;