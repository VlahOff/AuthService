module.exports = userId => {
	return `
  <div>
    <h1>Aniline</h1>
    <h2>You have 10 minutes to reset your password.</h2>
    <p>To reset your password please click this button bellow and enter your new password.</p>
    <a href="https://aniline.vercel.app/reset-password/${userId}" target="_blank">Reset password</a>
  </div>
  `;
};
