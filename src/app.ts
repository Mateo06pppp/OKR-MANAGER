import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import {testConnection}  from "./config/config-db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10101;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("OKR Manager funcionando correctamente 🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  testConnection(); // 👈 ejecuta la prueba de conexión
});
