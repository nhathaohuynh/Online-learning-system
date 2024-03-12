import ejs from 'ejs'
import nodemailer, { Transporter } from 'nodemailer'
import path from 'path'
import { env } from 'process'
import { IEmailOptions } from '../utils/types'

const sendMail = async (options: IEmailOptions): Promise<void> => {
	const transporter: Transporter = nodemailer.createTransport({
		host: env.SMTP_HOST,
		port: parseInt(env.SMTP_PORT || '456'),
		service: env.SMTP_SERVICE,
		auth: {
			user: env.SMTP_MAIL,
			pass: env.SMTP_PASSWORD,
		},
	})
	const { email, subject, template, data } = options

	const templatePath = path.join(__dirname, template)

	const html: string = await ejs.renderFile(templatePath, data)

	const mailOptions = {
		from: env.SMTP_MAIL,
		to: email,
		subject,
		html,
	}

	await transporter.sendMail(mailOptions)
}

export default sendMail
