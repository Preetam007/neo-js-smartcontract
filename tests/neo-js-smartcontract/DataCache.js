/* global describe it */

const assert = require('chai').assert;
const DataCache = require('../../source/smartcontract/Caching/DataCache');

describe(`DataCache.js`, () => {
  let cache = new DataCache();
  cache.Logging(true);

  it("init()", (done) => {
    assert(cache.dictionary.size === 0, 'cache.dictionary.size === 0');
    assert(!cache.dictionary.has('test'), '!cache.dictionary.has(\'test\')');
    done();
  });

  it("Add()", (done) => {
    cache.Add('test', 'value');
    assert(cache.dictionary.size === 1, 'cache.dictionary.size === 1');
    const addedTest = cache.dictionary.get('test');
    assert(addedTest.Item === 'value' && addedTest.State === 'Added', 'addedTest.Item === \'value\' && addedTest.State === \'Added\'');
    done();
  });

  it("Delete()", (done) => {
    assert(cache.dictionary.size === 1, 'cache.dictionary.size === 1');
    cache.Delete('test');
    assert(cache.dictionary.size === 0, 'cache.dictionary.size === 0');
    done();
  });

});