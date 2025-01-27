import nodemailer from "nodemailer"

export const emailConstants = {
    transporter: nodemailer.createTransport({
        service: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.USERNAME_EMAIL,
            pass: process.env.PASSWORD_EMAIL
        }
    })
}