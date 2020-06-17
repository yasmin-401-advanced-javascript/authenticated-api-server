'use strict';
/**
 * Import products schema and CRUD methods
 * @schema
 * @mongo
 */

const schema = require('./products.schema.js');
const Model = require('../mongo.js');

/**
 * products class copy of model class
 * @Model
 */

class Products extends Model {
  constructor() {
    super(schema);
  }
}

module.exports = new Products();

