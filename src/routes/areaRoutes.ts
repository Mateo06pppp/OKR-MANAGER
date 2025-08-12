import { Router } from 'express';
import { AreaController } from '../controller/areaController.js';

const areaRouter = Router();

const areaController = new AreaController();

areaRouter.get('/listar', areaController.list.bind(areaController));
areaRouter.get('/detalle/:id', areaController.get.bind(areaController));
areaRouter.post('/crear', areaController.create.bind(areaController));
areaRouter.put('/actualizar/:id', areaController.update.bind(areaController));
areaRouter.delete('/eliminar/:id', areaController.remove.bind(areaController));


export default areaRouter;