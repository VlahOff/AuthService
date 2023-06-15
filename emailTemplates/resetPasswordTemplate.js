module.exports = (userId) => {
  return `
  <body style="background-color: black;">
  <div style="text-align: center; background-color: black; padding: 2rem; font-family: Arial, Helvetica, sans-serif;">
    <h1 style="color: white; font-size: 3rem;">Aniline</h1>
    <div style="margin-bottom: 5rem;">
      <h2 style="color: white;">You have 10 minutes to reset your password.</h2>
      <p style="color: white; margin-bottom: 5rem;">To reset your password please click this button bellow and enter
        your new password.</p>
      <a href="https://aniline.vercel.app/reset-password/${userId}" target="_blank"
        style="background-color: rgb(177, 0, 0); color: white; padding: 8px 12px; border-radius: 0.5rem; text-decoration: none;"
        onMouseOver="this.style.backgroundColor='rgb(247, 16, 16)'"
        onMouseOut="this.style.backgroundColor='rgb(177, 0, 0)'">Reset password</a>
    </div>
  </div>
  </body>
  `;
};
