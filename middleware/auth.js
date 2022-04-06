import jsonwebtoken from "jsonwebtoken";

//If logged in user, the requests have a field: req.user
export const checkAuth = (req, res, next) => {
  try {
    const secret = process.env.JWT_SECRET;
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    jsonwebtoken.verify(token, secret, (err, decoded) => {
      if (!err) {
        req.user = decoded;
        next();
      } else {
        next();
      }
    });
  } catch (err) {
    next();
  }
};

//Has req.user and returns 403 if not logged in
export const ensureAuth = (req, res, next) => {
  try {
    const secret = process.env.JWT_SECRET;
    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    jsonwebtoken.verify(token, secret, (err, decoded) => {
      if (!err) {
        req.user = decoded;
        next();
      } else {
        res.sendStatus(403);
      }
    });
  } catch (err) {
    res.sendStatus(403);
  }
};