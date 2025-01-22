import express from "express";
import { conectarDB } from "./config/db.js";

const app = express();

conectarDB();

app.use("/", (req, res) => {
    res.send("hola mundo!!1!");
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log(`servidor funcionando en el puerto ${PORT}`);
});