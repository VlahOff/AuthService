const nodeMailer = require('nodemailer');

const HOST_USER = process.env.HOST_USER;
const HOST_PASS = process.env.HOST_PASS;

async function sendEmail(recipientEmail, userId) {
  const transporter = nodeMailer.createTransport({
    host: 'smtp.abv.bg',
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
    from: 'Aniline <aniline@abv.bg>',
    to: recipientEmail,
    subject: 'Password reset.',
    html: `
    <div style="text-align: center; background-color: black; font-family: Arial, Helvetica, sans-serif; padding: 2rem;">
    <h1 style="color: white; font-family: Arial, Helvetica, sans-serif; margin-top: 0;">Aniline</h1>
    <h2 style="color: white;">You have 10 minutes to reset your password.</h2>
    <a href="https://aniline.vercel.app/reset-password/${userId}" target="_blank"
      style="background-color: rgb(177, 0, 0); color: white; padding: 8px 12px; border-radius: 0.5rem; text-decoration: none;"
      onMouseOver="this.style.backgroundColor='rgb(247, 16, 16)'"
      onMouseOut="this.style.backgroundColor='rgb(177, 0, 0)'"
      >Reset password</a>
    </div>
    `,
  });
}

module.exports = sendEmail;
