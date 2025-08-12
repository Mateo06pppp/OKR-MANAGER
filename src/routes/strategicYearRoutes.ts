import { Router } from 'express';
import { StrategicYearController } from '../controller/strategicYearController.js';

const strategicYearRouter = Router();

const strategicYearController = new StrategicYearController();

strategicYearRouter.get('/listar/mega/:megaId', strategicYearController.listByMega.bind(strategicYearController));
strategicYearRouter.get('/detalle/:id', strategicYearController.get.bind(strategicYearController));
strategicYearRouter.post('/crear/mega/:megaId', strategicYearController.create.bind(strategicYearController));
strategicYearRouter.put('/actualizar/:id', strategicYearController.update.bind(strategicYearController));
strategicYearRouter.delete('/eliminar/:id', strategicYearController.remove.bind(strategicYearController));


export default strategicYearRouter;