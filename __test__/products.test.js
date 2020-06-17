'use strict';
require('@code-fellows/supergoose');
const mongo = require('../lib/models/products/products.collection.js');

describe('product Model', () => {
  const obj = {category: 'bbb',  name: 'tops' , display_name: 'T-shirt', description: 'COLOR BLACK'};
  it('create method (post)', () => {
    return mongo.create(obj).then((result) => {
      Object.keys(obj).forEach((key) => {
        expect(result[key]).toEqual(obj[key]);
      });
    });
  });
  it('get() all items', () => {
    return mongo.get().then((result) => {
      Object.keys(obj).forEach((key) => {
        expect(result[0][key]).toEqual(obj[key]);
      });
    });
  });
  it('get(id) items by Id', () => {
    const object = { category: 'fff', name: 'hat' , display_name: 'sunshine', description: 'COLOR BROWN'}; 
    return mongo.create(object).then((val) => {
      return mongo.get(val._id).then((result) => {
        Object.keys(obj).forEach((key) => {
          expect(result[0][key]).toEqual(object[key]);
        });
      });
    });
  });
  it('update() one items', () => {
    const object2 = {category: 'zzz', name: 'shoe' , display_name: 'shoes', description: 'COLOR BLACK'}; 
    return mongo.get().then((val) => {
      return mongo.update(val[0]._id , object2 ).then((result) => {
        return mongo.get(result._id).then((sec) => {   
          Object.keys(obj).forEach((key) => {
            expect(sec[0][key]).toEqual(object2[key]);
          });
        });
      });
    });
  });
  it('delete(id) items by Id', () => {
    return mongo.get().then((val) => {
      return mongo.delete(val[0]._id).then((result) => {
        return mongo.get(val[0]._id).then((check) => {
          Object.keys(obj).forEach((key) => {
            expect(check).toEqual([]);
          });
        });
      });
    });
  });
});