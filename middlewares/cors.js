module.exports = () => (req, res, next) => {
  const corsWhiteList = [
    'https://aniline.vercel.app/',
    'https://bulgarian-drivers.vercel.app/'
  ];

  if (corsWhiteList.indexOf(req.header.origin) !== -1) {
    res.header('Access-Control-Allow-Origin', req.header.origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-Authorization, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE,');
  }

  if (req.method == 'OPTIONS') {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json({});
  }

  next();
};