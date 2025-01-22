import mongoose from "mongoose"

export const conectarDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);

        const url = `${db.connection.host}:${db.connection.port}`
        console.log(`MongoDB conectado en: ${url}`)
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}