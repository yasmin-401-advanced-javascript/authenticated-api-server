'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');
const schema = require('./auth-schema.js');
const SECRET = process.env.SECRET;
const Model = require('../mongo.js');
const bcryptjs = require('bcryptjs');

const roles = {
  user : ['read'],
  writer : ['read' , 'add'],
  editor : ['read' , 'add' ,'update'],
  admin : ['read','add' ,'update','delete'],
};

/**
* Model Model
* @constructor Products
*/

class Users extends Model {
  constructor() {
    super(schema);
  }
  async save(record){
    const isUsedBefore = await this.get({username : record.username});
    // console.log('is used befor' , isUsedBefore);
    if(isUsedBefore.length == 0){
      const userData = await this.create(record);
      return userData;
    }
    
  }
  async authenticateBasic(user,pass){
    const result = await this.get({username : user});
    // console.log('authenticateBasic' , result);
    // let index=result[0];
    // console.log(index.password , 'zab6a?');
    const valid = await bcryptjs.compare(pass, result[0].password);
    console.log(valid, 'haek?');
    
    return valid ? result : Promise.reject('wrong password');

  }
  generateToken(user){
    console.log('user in generate token', user);
    const token =  jwt.sign({
      expiresIn: 90000,
      algorithm:  'RS384',
      username: user.username,
      capabilities : roles[user.role],
    }, SECRET);
    return token;
  }

  async authenticateToken  (token) {
    // console.log('token', token);
    try {
      const tokenValue = await jwt.verify(token, SECRET);
      const result = await this.get({username : tokenValue.username});
      // console.log('token', token);
      console.log('tttt' , result);
      
      if (result.length != 0) {
        return Promise.resolve(tokenValue);
      } else {
        return Promise.reject('User is not found!');
      }
    } catch (e) {
      return Promise.reject(e.message);
    }
  }
  can(permision){
    if(permision){

      return Promise.resolve(true);
    }else{
      return Promise.reject(false);
    }
  }
}

module.exports = new Users();