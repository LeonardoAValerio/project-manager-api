import nodemailer, { createTransport } from "nodemailer"

export const emailConstants = {
    transporter: createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 587,
        auth: {
            user: process.env.USERNAME_EMAIL,
            pass: process.env.PASSWORD_EMAIL
        }
    })
}