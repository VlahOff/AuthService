module.exports = () => (req, res, next) => {
  const corsWhiteList = [
    'https://aniline.vercel.app',
    'https://bulgarian-drivers.vercel.app',
    'http://localhost:3000'
  ];

  if (corsWhiteList.indexOf(req.headers.origin) !== -1) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Authorization, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,');
  }

  if (req.method == 'OPTIONS') {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({});
  }

  next();
};