import { Router } from 'express';
import { YearBudgetMonthController } from '../controller/yearBudgetMonthController.js';

const yearBudgetMonthRouter = Router();

const yearBudgetMonthController = new YearBudgetMonthController();

yearBudgetMonthRouter.get('/listar/budget/:budgetId', yearBudgetMonthController.listByBudget.bind(yearBudgetMonthController));
yearBudgetMonthRouter.get('/detalle/:id', yearBudgetMonthController.get.bind(yearBudgetMonthController));
yearBudgetMonthRouter.post('/crear', yearBudgetMonthController.create.bind(yearBudgetMonthController));
yearBudgetMonthRouter.put('/actualizar/:id', yearBudgetMonthController.update.bind(yearBudgetMonthController));
yearBudgetMonthRouter.delete('/eliminar/:id', yearBudgetMonthController.remove.bind(yearBudgetMonthController));


export default yearBudgetMonthRouter;