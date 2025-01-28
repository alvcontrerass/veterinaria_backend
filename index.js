import express from "express";
import { conectarDB } from "./config/db.js";
import veterinarioRouter from "./routes/veterinarioRoutes.js";
import pacienteRouter from "./routes/pacienteRoutes.js";

const app = express();
app.use(express.json());

conectarDB();

app.use("/api/veterinario", veterinarioRouter);
app.use("/api/paciente", pacienteRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`servidor funcionando en el puerto ${PORT}`);
});
