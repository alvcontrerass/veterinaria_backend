import mongoose from "mongoose";

export const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required:true,
        trim:true
    },
    password: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required:true,
        trim:true,
        unique:true
    },
    telfono: {
        type: String,
        default: null,
        trim:true
    },
    web: {
        type: String,
        default: null,
        trim:true
    },
    token: {
        type: String
    },
    confirmado: {
        type: Boolean,
        default: false
    }

});

export const Veterinario = mongoose.model("Veterinario", veterinarioSchema);