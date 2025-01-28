import express from "express";
const router = express.Router();
import {
	agregarPaciente,
	obtenerPaciente,
	obtenerPacienteEspecifico,
	actualizarPaciente,
	eliminarPaciente,
} from "../controllers/pacienteController.js";
import { checkAuth } from "../middleware/authMiddleware.js";

router
	.route("/")
	.post(checkAuth, agregarPaciente)
	.get(checkAuth, obtenerPaciente);
router
	.route("/:id")
	.get(checkAuth, obtenerPacienteEspecifico)
	.put(checkAuth, actualizarPaciente)
	.delete(checkAuth, eliminarPaciente);

export default router;
