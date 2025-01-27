import { Injectable } from "@nestjs/common";
import { emailConstants } from "./constants";

@Injectable()
export class EmailService {
    async sendEmail() {
        try {
            const result = await emailConstants.transporter.sendMail({
                from: '"Project maneger" <projectmanager@gmail.com>',
                to: 'destinatario@gmail.com',
                subject: 'Assunto do E-mail',
                text: 'Olá! Este é um e-mail enviado com Nodemailer.', 
                html: '<b>Olá!</b> Este é um e-mail enviado com <i>Nodemailer</i>.',
            });

            console.log(result.messageId);
        } catch(error) {
            console.log("ERROR email: ", error);
        }
    }
}