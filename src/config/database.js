// importar mongoose
import mongoose from "mongoose";

// establecer conexion
mongoose
  .connect("mongodb://localhost:27017/mongoose_practica")
  .then(() => console.log("se establecio la conexion a la base de datos"))
  .catch((error) =>
    console.log("No se pudo establecer la conexion a la base de datos:", error),
  );
