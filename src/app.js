import 'dotenv/config'
import express 	from "express";	// hacer npm i express
import cors 	from "cors";	// hacer npm i cors

import alumnoController from "./controllers/alumnoController.js"
import profesorController from "./controllers/profesorController.js"
import gestorController from "./controllers/gestorController.js"
import materiaController from "./controllers/materiaController.js"
import institucionController from "./controllers/institucionController.js"
import contenidoController from "./controllers/contenidoController.js"
import cursoController from "./controllers/cursoController.js"

const app  = express();
const port = process.env.PORT || 3000;  // si no esta definido en el archivo .env uso el 3000.

// Agrego los Middlewares
app.use(cors());         // Middleware de CORS
app.use(express.json()); // Middleware para parsear y comprender JSON

// Endpoints (todos los Routers)
app.use("/api/auth", authController);
app.use("/api/institucion", institucionController);
app.use("/api/alumno", alumnoController);
app.use("/api/profesor", profesorController);
app.use("/api/contenido", contenidoController);
app.use("/api/gestor", gestorController);
//
// Inicio el Server y lo pongo a escuchar.
//
app.listen(port, () => {	// Inicio el servidor WEB (escuchar)
    console.log("server.js");
    console.log(`Listening on http://localhost:${port}`)
})
  