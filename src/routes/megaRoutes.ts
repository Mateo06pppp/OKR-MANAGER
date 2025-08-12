import { Router } from 'express';
import { MegaController } from '../controller/megaController.js';

const megaRouter = Router();

const megaController = new MegaController();

megaRouter.get('/listar', megaController.list.bind(megaController));
megaRouter.get('/detalle/:id', megaController.get.bind(megaController));
megaRouter.post('/crear', megaController.create.bind(megaController));
megaRouter.put('/actualizar/:id', megaController.update.bind(megaController));
megaRouter.delete('/eliminar/:id', megaController.remove.bind(megaController));

export default megaRouter;