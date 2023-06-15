const activateAccountTemplate = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account is now active</title>
</head>

<body style="background-color: black;">
  <div style="text-align: center; background-color: black; padding: 2rem; font-family: Arial, Helvetica, sans-serif;">
    <h1 style="color: white; font-size: 2rem;">Your account is now active!</h1>
    <a href="https://aniline.vercel.app/login"
      style="background-color: rgb(177, 0, 0); color: white; padding: 8px 12px; border-radius: 0.5rem; text-decoration: none;"
      onMouseOver="this.style.backgroundColor='rgb(247, 16, 16)'"
      onMouseOut="this.style.backgroundColor='rgb(177, 0, 0)'">Login</a>
  </div>
</body>

</html>
`;

module.exports = activateAccountTemplate;
