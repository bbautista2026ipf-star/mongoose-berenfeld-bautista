// Punto de entrada: configura Express, monta las rutas y levanta el servidor

// Primer import: carga el .env en process.env antes de evaluar los demás módulos
import "dotenv/config";
import express from "express";
import cors from "cors";
import {
  notFoundHandler,
  errorHandler,
} from "./src/middlewares/error.middleware.js";
import "./src/config/database.js";

// Instancia de la aplicación; PORT por defecto si no está en el .env
const app = express();
const PORT = process.env.PORT || 3000;

// CORS va primero para que también las respuestas de error lleven sus cabeceras
app.use(
  cors({
    // Origen permitido (frontend en Vite) y envío de cookies entre orígenes
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
// Parsean el body JSON a req.body y las cookies a req.cookies
app.use(express.json());

// Routers montados bajo el prefijo /api

// Después de las rutas: 404 si ninguna coincidió y manejador de errores global
app.use(notFoundHandler);
app.use(errorHandler);

// En Express 5 el callback también recibe el error si el servidor no inicia
app.listen(PORT, (error) => {
  if (error) {
    console.error("No se pudo iniciar el servidor:", error.message);
    process.exit(1);
  }

  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
