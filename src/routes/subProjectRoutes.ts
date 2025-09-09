import { Router } from "express";
import subProjectController from "../controller/subProjectController.js";

const router = Router();

router.get("/listar", subProjectController.getAll);
router.get("/obtener/:id", subProjectController.getById);
router.post("/crear", subProjectController.create);
router.put("/actualizar/:id", subProjectController.update);
router.delete("/eliminar/:id", subProjectController.delete);

export default router;
