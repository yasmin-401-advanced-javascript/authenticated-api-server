'use strict';

const logger = require('../middleware/logger.js');

describe('logger' , () => {
  let consoleSpy ;
  let req = {} ;
  let res = {} ;
  let next = jest.fn();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console , 'log').mockImplementation();
        
  });

  afterEach(() => {
    consoleSpy.mockRestore() ;
  });


  it('it will show the method and the path', () => {
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });



});