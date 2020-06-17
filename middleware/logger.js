'use strict';

module.exports = (req, res, next) => {
    
  console.log('the method is' , req.method, 'the path is', req.path , 'and the time is' , req.requestTime);
 
  next();
};