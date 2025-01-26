import express from "express";
import { registrar, perfil, confirmar, autenticar } from "../controllers/veterinarioController.js";
const router = express.Router();

router.post("/", registrar);
router.get("/confirmar/:token", confirmar)
router.post("/login", autenticar)

router.get("/perfil", perfil)

export default router;