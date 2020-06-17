const base64 = require('base-64');
const users = require('../models/user/user-model.js');

/*
headers:{
  "authorization":"Basic m4e321$342"
}
*/
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    next('Invalid Login');
  } else {
    const basic = req.headers.authorization.split(' ').pop(); // ["Basic","m4e321$342"]
    const [user, pass] = base64.decode(basic).split(':'); // "mahmoud:1234"
    users
      .authenticateBasic(user, pass)
      .then((validUser) => {
        req.token = users.generateToken(validUser[0]);
        req.user = validUser[0];
        next();
      })
      .catch((err) => next(err));
  }
};