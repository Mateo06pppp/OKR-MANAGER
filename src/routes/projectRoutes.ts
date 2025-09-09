import { Router } from "express";
import projectController from "../controller/projectController.js";

const router = Router();

router.get("/listar", projectController.getAll);
router.get("/obtener/:id", projectController.getById);
router.post("/crear", projectController.create);
router.put("/actualizar/:id", projectController.update);
router.delete("/eliminar/:id", projectController.delete);

export default router;
