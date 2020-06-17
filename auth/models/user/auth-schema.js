/**
 * mongoose library
 * @mongoose
 */
'use strict';
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
// const roles = require('./roles-model.js');
const user = mongoose.Schema({
  username:{ type: String, required: true },
  password: { type: String, required: true },
  role : {
    type : String,
    default : 'user',
    enum : ['admin', 'editor' ,'writer','user'],
  },
});


user.pre('save',async function () {
  this.password = await bcryptjs.hash(this.password, 5);
});

module.exports = mongoose.model('user', user);