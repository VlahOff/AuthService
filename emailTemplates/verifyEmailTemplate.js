module.exports = (email) => {
  return `
  <div>
    <h2>Please verify your email address</h2>
    <p>To be able to use your account.</p>
    <a href="https://rose-frantic-butterfly.cyclic.app/auth/verifyEmail?email=${email}" target="_blank">Verify email</a>
    <p>This email is for verification purposes only.</p>
  </div>
  `;
};
