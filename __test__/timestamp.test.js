const timesTamp = require('../middleware/timestamp.js');


describe('timesTamp', () => {
  const req = {};
  const res = {};
  const next = jest.fn();


  it('it will move to the next middleware', () => {
    timesTamp(req, res, next);
    expect(next).toHaveBeenCalledWith(); 
  });
});