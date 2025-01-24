import {Veterinario} from "../models/Veterinario.js"

export const registrar = async (req, res) => {
    try {
        const veterinario = new Veterinario(req.body)
        const veterinarioGuardado = await veterinario.save()
        res.json(`El correo ${veterinarioGuardado.email} ha sido registrado`)
    } catch (error) {
        console.log(error)
    }

}

export const perfil = (req, res) => {
    res.json({
        msg: "Mostrando perfil..."
    })
}