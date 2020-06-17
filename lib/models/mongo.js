'use strict';

class Model {
  constructor(schema) {
    this.schema = schema;
  }

  /**
     * get data from database
     * @param _id  
     * @return {object}
     */
    
  get(_id) {
    const queryObject = _id ? { _id } : {};
    return this.schema.find(queryObject);
  }

  /**
     * add data to database
     * @param record  
     * @return {object}
     */
    
  create(record) {
    const newRecord = new this.schema(record);
    return newRecord.save();
  }

  /**
     * updte data to database
     * @param record  
     * @param _id  
     * @return {object}
     */

  update(_id, record) {
    return this.schema.findByIdAndUpdate(_id, record, { new: true });
  }

  /**
     * delete data to database
     * @param _id  
     * @return {empty object}
     */

     
  delete(_id) {
    return this.schema.findByIdAndDelete(_id);
  }
}

module.exports = Model;