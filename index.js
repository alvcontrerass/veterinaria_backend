import express from "express";
import { conectarDB } from "./config/db.js";
import veterinarioRouter from "./routes/veterinarioRoutes.js";

const app = express();
app.use(express.json());

conectarDB();

app.use("/api/veterinario", veterinarioRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`servidor funcionando en el puerto ${PORT}`);
});