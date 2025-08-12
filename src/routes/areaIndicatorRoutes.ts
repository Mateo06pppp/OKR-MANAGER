import { Router } from 'express';
import { AreaIndicatorController } from '../controller/areaIndicatorController.js';

const areaIndicatorRouter = Router();

const areaIndicatorController = new AreaIndicatorController();

areaIndicatorRouter.get('/listar/area/:areaId', areaIndicatorController.listByArea.bind(areaIndicatorController));
areaIndicatorRouter.get('/detalle/:id', areaIndicatorController.get.bind(areaIndicatorController));
areaIndicatorRouter.post('/crear/area/:areaId', areaIndicatorController.create.bind(areaIndicatorController));
areaIndicatorRouter.put('/actualizar/:id', areaIndicatorController.update.bind(areaIndicatorController));
areaIndicatorRouter.delete('/eliminar/:id', areaIndicatorController.remove.bind(areaIndicatorController));

export default areaIndicatorRouter;