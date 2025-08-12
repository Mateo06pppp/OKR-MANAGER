import { Router } from "express";
import userController from "../controller/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = Router();

// Auth
router.post("/register", userController.register);
router.post("/login", userController.login);

// CRUD protegido
router.get("/listar", verifyToken, userController.getAll);
router.get("/detalle/:id", verifyToken, userController.getById);
router.put("/actualizar/:id", verifyToken, userController.update);
router.delete("/eliminar/:id", verifyToken, userController.delete);

export default router;
