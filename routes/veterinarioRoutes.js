import express from "express";
import {
	registrar,
	perfil,
	confirmar,
	autenticar,
	olvidePassword,
	comprobarToken,
	nuevoPassword,
	actualizarPerfil,
	actualizarPassword,
} from "../controllers/veterinarioController.js";
const router = express.Router();
import { checkAuth } from "../middleware/authMiddleware.js";
//publico
router.post("/", registrar);
router.get("/confirmar/:token", confirmar);
router.post("/login", autenticar);
router.post("/olvide-password", olvidePassword);
//forma reducida
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

//privado
router.get("/perfil", checkAuth, perfil);
router.put("/perfil/:id", checkAuth, actualizarPerfil);
router.put("/actualizar-password", checkAuth, actualizarPassword);

export default router;
