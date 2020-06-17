'use strict';

/**
 * Import categories schema and CRUD methods
 * @schema
 * @mongo
 */


const schema = require('./categories.schema.js');
const Model = require('../mongo.js');

/**
 * categories class copy of model class
 * @Model
 */

class categories extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new categories();