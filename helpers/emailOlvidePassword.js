import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const emailOlvidePassword = async (nombre, token) => {
	//*agregar correo en ambiente de produccion*
	const { data, error } = await resend.emails.send({
		from: "Acme <onboarding@resend.dev>",
		to: ["alvarocontrerasilva@gmail.com"],
		subject: "Reestablece tu Password",
		html: `Hola! ${nombre}. Puedes reestablecer tu password en el siguiente enlace\n
        <a href=${process.env.FRONTEND_URL}/olvide-password/${token}>Reestablece tu Password</a>`,
	});

	if (error) {
		return console.error({ error });
	}
	console.log({ data });
};
