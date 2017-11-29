/* global describe it */

const assert = require('chai').assert;
const ApplicationEngine = require('../../source/smartcontract/ApplicationEngine');

describe(`ApplicationEngine.js`, () => {
  let engine = new ApplicationEngine();
  engine.Logging(true);

  it("init()", (done) => {
    // assert(false, 'false');
    done();
  });

  it("Run()", (done) => {
    const state = engine.Run([]);
    // console.log(state);
    done();
  });
});