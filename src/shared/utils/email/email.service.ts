import { Injectable } from "@nestjs/common";
import nodemailer, { Transporter } from "nodemailer"
import { emailConstants } from "./constants";

@Injectable()
export class EmailService {
    async sendEmail() {
        try {
            const result = await emailConstants.transporter.sendMail({
                from: '"Seu Nome" <seuemail@gmail.com>', // Nome e e-mail do remetente
                to: 'destinatario@gmail.com', // Destinatário(s)
                subject: 'Assunto do E-mail', // Assunto
                text: 'Olá! Este é um e-mail enviado com Nodemailer.', // Texto puro
                html: '<b>Olá!</b> Este é um e-mail enviado com <i>Nodemailer</i>.', // HTML opcional
            });

            console.log(result.messageId);
        } catch(error) {
            console.log("ERROR email: ", error);
        }
    }
}