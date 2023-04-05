module.exports = () => (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://aniline.vercel.app/');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Authorization, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,');

  if (req.method == 'OPTIONS') {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({});
  }

  next();
};