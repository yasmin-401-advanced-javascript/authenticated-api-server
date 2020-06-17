'use strict';

module.exports = (req, res, next) => {
    
  const date = new Date();
  const currentDate = date.toLocaleDateString();
  req.requestTime = currentDate;
  next();
};