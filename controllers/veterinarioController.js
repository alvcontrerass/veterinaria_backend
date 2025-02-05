import { Veterinario } from "../models/Veterinario.js";
import { generarJWT } from "../helpers/generarJWT.js";
import { generarId } from "../helpers/generarId.js";
import { emailRegistro } from "../helpers/emailRegistro.js";
//*Cambiar los argumentos en la funcion emailRegistro(Linea 19) en produccion*

export const registrar = async (req, res) => {
	const { email } = req.body;
	const existeUsuario = await Veterinario.findOne({ email });
	if (existeUsuario) {
		const error = new Error("El correo ya esta registrado");
		return res.status(400).json({ msg: error.message });
	}

	try {
		const veterinario = new Veterinario(req.body);
		const veterinarioGuardado = await veterinario.save();
		const {nombre, token } = veterinarioGuardado; //agregar correo en ambiente de produccion
		emailRegistro(nombre, token)
		res.json(`El correo ${veterinarioGuardado.email} ha sido registrado`);
	} catch (error) {
		console.log(error);
	}
};

export const perfil = (req, res) => {
	const { veterinario } = req;
	res.json({ perfil: veterinario });
};

export const confirmar = async (req, res) => {
	const { token } = req.params;
	const usuarioConfirmar = await Veterinario.findOne({ token });
	if (!usuarioConfirmar) {
		const error = new Error("Token no valido");
		return res.status(401).json({ msg: error.message });
	}
	try {
		usuarioConfirmar.token = null;
		usuarioConfirmar.confirmado = true;
		await usuarioConfirmar.save();
		res.json({ msg: "Cuenta confirmada" });
	} catch (error) {
		console.log(error);
	}
};

export const autenticar = async (req, res) => {
	const { email, password } = req.body;
	const usuario = await Veterinario.findOne({ email });

	if (!usuario) {
		const error = new Error("El usuario no existe");
		return res.status(404).json({ msg: error.message });
	}
	try {
		if (!usuario.confirmado) {
			const error = new Error("Tu cuenta no ha sido confirmada");
			return res.status(403).json({ msg: error.message });
		}
	} catch (error) {
		console.log(error);
	}

	try {
		if (!(await usuario.comprobarPassword(password))) {
			const error = new Error("El password es incorrecto");
			return res.status(403).json({ msg: error.message });
		}
		res.json({ token: generarJWT(usuario.id) });
	} catch (error) {
		console.log(error);
	}
};

export const olvidePassword = async (req, res) => {
	const { email } = req.body;
	const existeVeterinario = await Veterinario.findOne({ email });

	if (!existeVeterinario) {
		const error = new Error("El usuario no existe");
		return res.status(404).json({ msg: error.message });
	}

	try {
		existeVeterinario.token = generarId();
		await existeVeterinario.save();
		res.json({ msg: "Hemos enviado un email con las instrucciones" });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
};

export const comprobarToken = async (req, res) => {
	const { token } = req.params;
	const tokenValido = await Veterinario.findOne({ token });
	if (tokenValido) {
		res.json({ msg: "Token valido" });
	} else {
		const error = new Error("Token no valido");
		return res.status(401).json({ msg: error.message });
	}
};

export const nuevoPassword = async (req, res) => {
	const { token } = req.params;
	const { password } = req.body;

	const veterinario = await Veterinario.findOne({ token });
	if (!veterinario) {
		const error = new Error("token no valido o expirado");
		return res.status(401).json({ msg: error.message });
	}

	try {
		veterinario.token = null;
		veterinario.password = password;
		await veterinario.save();
		res.json({ msg: "Password modificado correctamente" });
	} catch (error) {
		console.log(error);
	}
};
