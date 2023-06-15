module.exports = (email) => {
  return `
  <body style="background-color: black;">
  <div style="text-align: center; background-color: black; padding: 2rem; font-family: Arial, Helvetica, sans-serif;">
    <h1 style="color: white; font-size: 3rem;">Aniline</h1>
    <div style="margin-bottom: 5rem;">
      <h2 style="color: white;">Please verify your email address</h2>
      <p style="color: white; margin-bottom: 5rem;">To be able to use your account.</p>
      <a href="https://rose-frantic-butterfly.cyclic.app/auth/verifyEmail?email=${email}" target="_blank"
        style="background-color: rgb(177, 0, 0); color: white; padding: 8px 12px; border-radius: 0.5rem; text-decoration: none;"
        onMouseOver="this.style.backgroundColor='rgb(247, 16, 16)'"
        onMouseOut="this.style.backgroundColor='rgb(177, 0, 0)'">Verify email</a>
    </div>
  </div>
  </body>
  `;
};
