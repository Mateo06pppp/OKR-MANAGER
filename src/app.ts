import express, { type Request, type Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import { testConnection } from "./config/config-db.js";
import keyResultRoutes from "./routes/keyResultRoutes.js";
import objetive from "./routes/objetiveRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import megaRouter from "./routes/megaRoutes.js";
import strategicYearRouter from "./routes/strategicYearRoutes.js";
import yearObjectiveRouter from "./routes/yearObjectiveRoutes.js";
import yearBudgetRouter from "./routes/yearBudgetRoutes.js";
import yearBudgetMonthRouter from "./routes/yearBudgetMonthRoutes.js";
import areaRouter from "./routes/areaRoutes.js";
import areaIndicatorRouter from "./routes/areaIndicatorRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 10101;

// Middlewares
app.use(cors({
    origin: ["http://localhost:3000", "http://localhost:3001"], // Asegúrate que coincida con tu frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  }));
app.use(morgan("dev"));
app.use(express.json());

// Ruta base
app.get("/", (_req: Request, res: Response) => {
  res.send("✅ OKR Manager funcionando correctamente 🚀");
});

// Rutas de OKRs y KRs
app.use("/keyResult", keyResultRoutes);
app.use("/objetive", objetive);
app.use("/users", userRoutes);
app.use('/mega', megaRouter);
app.use('/strategic-year', strategicYearRouter);
app.use('/year-objective', yearObjectiveRouter);
app.use('/year-budget', yearBudgetRouter);
app.use('/year-budget-month', yearBudgetMonthRouter);
app.use('/area', areaRouter);
app.use('/area-indicator', areaIndicatorRouter);


// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  testConnection(); // Prueba de conexión a la BD
});

export default app;
