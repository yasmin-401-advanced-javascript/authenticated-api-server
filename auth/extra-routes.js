const express = require('express');

const bearerMiddleware = require('./middleware/bearer-auth.js');
const acl = require('./middleware/acl-middleware.js');

const router = express.Router();


router.get('/secret', bearerMiddleware, (req,res) => {
  res.json(req.user);
});

router.post('/read', bearerMiddleware, acl('read'), (req, res) => {
  res.send('you can only read the data!');
});

router.post('/create', bearerMiddleware, acl('create'), (req, res) => {
  res.send('you can create new data and read it!');
});

router.put('/update', bearerMiddleware, acl('update'), (req, res) => {
  res.send('you can update data also create new data and read it!');
});

router.delete('/delete', bearerMiddleware, acl('delete'), (req, res) => {
  res.send('you can delete,update data also create new data and read it!');
});

module.exports = router;