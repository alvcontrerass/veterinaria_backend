import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailRegistro = async (nombre, token) => { //*agregar correo en ambiente de produccion*
    const {data, error} = await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: ["alvarocontrerasilva@gmail.com"],
        subject: "Confirma tu cuenta",
        html: `Hola! ${nombre}. Por favor verifica tu cuenta en el sigueinte link \n
        <a href=${process.env.FRONTEND_URL}/confirmar/${token}>Verificar Cuenta</a>`,
    });

    if (error) {
        return console.error({error});
    }
    console.log({data})
}