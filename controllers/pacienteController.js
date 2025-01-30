import { Paciente } from "../models/Paciente.js";

export const agregarPaciente = async (req, res) => {
	const paciente = new Paciente(req.body);
	paciente.veterinario = req.veterinario._id;
	try {
		const pacienteGuardado = await paciente.save();
		res.json({
			msg: `el paciente ${pacienteGuardado.nombre} de ${pacienteGuardado.propietario} ha sido ingresado`,
		});
	} catch (error) {
		console.log(error);
	}
};

export const obtenerPaciente = async (req, res) => {
	const pacientes = await Paciente.find()
		.where("veterinario")
		.equals(req.veterinario);
	console.log(req.veterinario);
	res.json(pacientes);
};

export const obtenerPacienteEspecifico = async (req, res) => {
	const { id } = req.params;
	const paciente = await Paciente.findById(id);

	if (!paciente) {
		res.status(404).json({ msg: "Paciente no encontrado" });
	}

	if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
		return res.json({ msg: "Permiso denegado" });
	}

	res.json(paciente);
};

export const actualizarPaciente = async (req, res) => {
	const { id } = req.params;
	const paciente = await Paciente.findById(id);

	if (!paciente) {
		return res.status(404).json({ msg: "Paciente no encontrado" });
	}

	if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
		return res.json({ msg: "Permiso denegado" });
	}

	paciente.nombre = req.body.nombre || paciente.nombre;
	paciente.propietario = req.body.propietario || paciente.propietario;
	paciente.email = req.body.email || paciente.email;
	paciente.fecha = req.body.fecha || paciente.fecha;
	paciente.sintomas = req.body.sintomas || paciente.sintomas;

	try {
		const pacienteActualizado = await paciente.save();
		res.json(pacienteActualizado);
	} catch (error) {
		console.log(error);
	}
};

export const eliminarPaciente = async (req, res) => {
	const { id } = req.params;
	const paciente = await Paciente.findById(id);

	if (!paciente) {
		return res.status(404).json({ msg: "Paciente no encontrado" });
	}

	if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
		return res.json({ msg: "Permiso denegado" });
	}

	try {
		await paciente.deleteOne();
		res.json({ msg: "Paciente eliminado" });
	} catch (error) {
		console.log(error);
	}
};
