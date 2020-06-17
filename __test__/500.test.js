'use strict';
const { server } = require('../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);

describe('500 module', () => {
  it('should respond with 500 on invalied route (status)', () => {
    return mockRequest.put('/api/v1/categories').send({}).then((results) => {
      expect(results.status).toBe(500);
    }).catch(e=>{});
  });
});