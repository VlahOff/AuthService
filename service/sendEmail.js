const nodeMailer = require('nodemailer');

const HOST_USER = process.env.HOST_USER;
const HOST_PASS = process.env.HOST_PASS;

async function sendEmail(recipientEmail, emailTemplate) {
	const transporter = nodeMailer.createTransport({
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth: {
			user: HOST_USER,
			pass: HOST_PASS,
		},
		tls: { rejectUnauthorized: false },
		logger: true,
		debug: true,
	});

	await transporter.sendMail({
		from: HOST_USER,
		to: recipientEmail,
		html: emailTemplate,
	});
}

module.exports = sendEmail;
