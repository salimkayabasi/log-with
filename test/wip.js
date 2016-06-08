var chai = require('chai');
var dirtyChai = require('dirty-chai');
chai.use(dirtyChai);
var expect = chai.expect;

describe('We need to add some test', function () {
  it('should cover lots of tests', function () {
    expect(true).to.be.true();
  });
});
