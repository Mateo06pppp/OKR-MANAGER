import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import userService from "../services/userService.js";
import generateToken from "../helpers/generateToken.js";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const user = await userService.register(req.body);
      res.status(201).json({ success: true, user });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.findByEmail(email);

      if (!user) {
        return res.status(404).json({ success: false, message: "Usuario no encontrado" });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
      }

      const token = generateToken({ id_usuario: user.id, id_rol: user.rol }, 120);

      res.json({ success: true, token });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.findAll();
      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await userService.findById(Number(req.params.id));
      if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = await userService.update(Number(req.params.id), req.body);
      res.json(updated);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deleted = await userService.delete(Number(req.params.id));
      res.json(deleted);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new UserController();
