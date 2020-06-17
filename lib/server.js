'use strict';

const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const notFoundHandler = require('../middleware/404');
const errorHandler = require('../middleware/500');
const routes = require('./routes/routs.js');
const auth = require('../auth/router.js');

// body-parser to add body to the req
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

//ROUTS
app.use('/' , auth);
app.use('/api/v1' , routes);
app.use('*' , notFoundHandler);
app.use(errorHandler);


/**
 * start the server
 * @param object
 */

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || process.env.PORT || 4000;
    app.listen(PORT, () =>{
      console.log(`Listening on ${PORT}`);
    });
  },
};

