import { Router } from "express";
import subAreaIndicatorController from "../controller/subAreaIndicatorController.js";

const router = Router();

router.get("/listar", subAreaIndicatorController.getAll);
router.get("/obtener/:id", subAreaIndicatorController.getById);
router.post("/crear", subAreaIndicatorController.create);
router.put("/actualizar/:id", subAreaIndicatorController.update);
router.delete("/eliminar/:id", subAreaIndicatorController.delete);

export default router;
