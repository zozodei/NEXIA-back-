import 'dotenv/config'
import express from "express";
import cors from "cors";

import alumnoController from "./controllers/alumnoController.js"
import profesorController from "./controllers/profesorController.js"
import gestorController from "./controllers/gestorController.js"
import materiaController from "./controllers/materiaController.js"
import institucionController from "./controllers/institucionController.js"
import contenidoController from "./controllers/contenidoController.js"
import cursoController from "./controllers/cursoController.js"
import authController from "./controllers/authController.js"

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authController);
app.use("/api/institucion", institucionController);
app.use("/api/alumno", alumnoController);
app.use("/api/profesor", profesorController);
app.use("/api/contenido", contenidoController);
app.use("/api/gestor", gestorController);
app.use("/api/curso", cursoController);
app.use("/api/materia", materiaController);

app.listen(port, () => {
    console.log("server.js");
    console.log(`Listening on http://localhost:${port}`)
});