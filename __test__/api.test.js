'use strict';
const { server } = require('../lib/server.js');
const supergoose = require('@code-fellows/supergoose');
const mockRequest = supergoose(server);

describe('category API', () => {
  it('can post()', () => {
    const obj = {
      name: 'tops',
      display_name: 'T-shirt',
      description: 'COLOR BLACK',
    };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then((data) => {
        const record = data.body;
        Object.keys(obj).forEach((key) => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });
  it('can get()', () => {
    const obj = {
      name: 'tops',
      display_name: 'T-shirt',
      description: 'COLOR BLACK',
    };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then((data) => {
        return mockRequest.get('/api/v1/categories').then((results) => {
          Object.keys(obj).forEach((key) => {
            expect(results.body.result[1][key]).toEqual(obj[key]);
          });
        });
      });
  });
  it('can get(id)', () => {
    const obj = {
      name: 'shoe',
      display_name: 'zzz',
      description: 'COLOR BLACK',
    };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then((data) => {
        const record = data.body;
        return mockRequest
          .get(`/api/v1/categories/${record._id}`)
          .then((results) => {
            Object.keys(obj).forEach((key) => {
              expect(results.body[0][key]).toEqual(obj[key]);
            });
          });
      });
  });
  it('can update(id , obj )', () => {
    const obj = {
      name: 'shoe',
      display_name: 'zzz',
      description: 'COLOR BLACK',
    };
    const obj2 = {
      name: 'hat',
      display_name: 'zzz',
      description: 'COLOR BLACK',
    };
    return mockRequest
      .post('/api/v1/categories')
      .send(obj)
      .then((data) => {
        const record = data.body;
        return mockRequest
          .put(`/api/v1/categories/${record._id}`)
          .send(obj2)
          .then((results) => {
            Object.keys(obj).forEach((key) => {
              expect(results.body[key]).toEqual(obj2[key]);
            });
          });
      });
  });
  it('can delete(id)', () => {
    return mockRequest
      .get('/api/v1/categories')
      .then((data) => {
        const id = data.body.result[0]._id;
        return mockRequest
          .delete(`/api/v1/categories/${id}`)
          .then((results) => {
            expect(results.body).toEqual({status: 'item deleted'});
          });
      });
  });
});

describe('products API', () => {
  it('can post()', () => {
    const obj = {
      category: 'bbb', 
      name: 'tops',
      display_name: 'T-shirt',
      description: 'COLOR BLACK',
    };
    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then((data) => {
        const record = data.body;
        Object.keys(obj).forEach((key) => {
          expect(record[key]).toEqual(obj[key]);
        });
      });
  });
  it('can get()', () => {
    const obj = {
      category: 'bbb', 
      name: 'tops',
      display_name: 'T-shirt',
      description: 'COLOR BLACK',
    };
    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then((data) => {
        return mockRequest.get('/api/v1/products').then((results) => {
          Object.keys(obj).forEach((key) => {
            expect(results.body.result[1][key]).toEqual(obj[key]);
          });
        });
      });
  });
  it('can get(id)', () => {
    const obj = {
      category: 'bbb', 
      name: 'shoe',
      display_name: 'zzz',
      description: 'COLOR BLACK',
    };
    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then((data) => {
        const record = data.body;
        return mockRequest
          .get(`/api/v1/products/${record._id}`)
          .then((results) => {
            Object.keys(obj).forEach((key) => {
              expect(results.body[0][key]).toEqual(obj[key]);
            });
          });
      });
  });
  it('can update(id , obj )', () => {
    const obj = {
      category: 'bbb', 
      name: 'shoe',
      display_name: 'zzz',
      description: 'COLOR BLACK',
    };
    const obj2 = {
      category: 'nnn', 
      name: 'hat',
      display_name: 'zzz',
      description: 'COLOR BLACK',
    };
    return mockRequest
      .post('/api/v1/products')
      .send(obj)
      .then((data) => {
        const record = data.body;
        return mockRequest
          .put(`/api/v1/products/${record._id}`)
          .send(obj2)
          .then((results) => {
            Object.keys(obj).forEach((key) => {
              expect(results.body[key]).toEqual(obj2[key]);
            });
          });
      });
  });
  it('can delete(id)', () => {
    return mockRequest
      .get('/api/v1/products')
      .then((data) => {
        const id = data.body.result[0]._id;
        return mockRequest
          .delete(`/api/v1/products/${id}`)
          .then((results) => {
            expect(results.body).toEqual({status: 'item deleted'});
          });
      });
  });
});
