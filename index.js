import express from "express";
import { conectarDB } from "./config/db.js";
import veterinarioRouter from "./routes/veterinarioRoutes.js";
import pacienteRouter from "./routes/pacienteRoutes.js";
import cors from "cors"

const app = express();
app.use(express.json());

conectarDB();

const dominiosPermitidos = ["http://localhost:5173", "http://localhost:4000", "https://localhost:4000"]

const corsOptions = {
	origin: (origin, callback) => {
		if (dominiosPermitidos.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error("No permitido por CORS"))
		}
	}
}

app.use(cors(corsOptions));

app.use("/api/veterinario", veterinarioRouter);
app.use("/api/paciente", pacienteRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`servidor funcionando en el puerto ${PORT}`);
});
