import { Injectable } from "@nestjs/common";
import { emailConstants } from "./constants";
import { Headers } from "nodemailer/lib/mailer";

@Injectable()
export class EmailService {
    private from = '"Project maneger" <projectmanager@gmail.com>';

    async sendInvite(toEmail: string, nameProject: string, usernameInvited: string, token: string) {
        await this.sendEmail({
            to: toEmail,
            subject: "Você recebeu um convite para participar de um projeto!",
            text: "Você acaba de receber um convite para participar do projeto " + nameProject + "\nPara entrar clique no botão abaixo e aceite o convite!",
            html: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Convite para Participar do Projeto</title>
                    <style>
                        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #f9f9f9; }
                        .header { text-align: center; background: #4CAF50; color: #fff; padding: 15px; border-radius: 8px 8px 0 0; font-size: 20px; }
                        .content { text-align: center; padding: 20px; }
                        .content p { margin: 10px 0; }
                        .button { display: inline-block; background: #4CAF50; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-size: 16px; font-weight: bold; }
                        .button:hover { background: #45a049; }
                        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
                    </style>
                    </head>
                    <body>
                    <div class="container">
                        <div class="header">Você foi convidado!</div>
                        <div class="content">
                        <p>Olá,</p>
                        <p>Você foi convidado por `+ usernameInvited +` para participar do projeto: ` + nameProject +`</p>
                        <p><a href="https:/localhost:3333/invite/accept/token?=`+ token +`" class="button">Aceitar Convite</a></p>
                        <p>Estamos ansiosos para trabalhar com você!</p>
                        </div>
                        <div class="footer">© 2025 Nome da Empresa</div>
                    </div>
                    </body>
                    </html>`
        })
    }

    private async sendEmail(props: {to: string, subject: string, text?: string, headers?: Headers, html?: string}) {
        try {
            const result = await emailConstants.transporter.sendMail({
                from: this.from,
                to: props.to,
                subject: props.subject,
                text: props.text, 
                html: props.html,
                headers: props.headers
            });

            console.log(result.messageId);
        } catch(error) {
            console.log("ERROR email: ", error);
        }
    }
}