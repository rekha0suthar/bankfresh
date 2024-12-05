import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
  try {
    let token = req.header('authorization').split(' ')[1];

    if (!token) {
      return res.status(401).send('Unauthorized');
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify;
    next();
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
};
