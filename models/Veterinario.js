import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { generarId } from "../helpers/generarId.js";

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
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false
    }

});

veterinarioSchema.pre("save", function(next) {
    if(!this.ismodified("password")) {
        next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

export const Veterinario = mongoose.model("Veterinario", veterinarioSchema);