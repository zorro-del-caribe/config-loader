const test = require('tape');
const config = require('../index.js');

test('load config based on test env', function (t) {
  const conf = config({folder: './test/config'});
  t.equal(conf.value('foo.prop'), 'testValue', 'overwrite value');
  t.equal(conf.value('foo.defaultProp'), 'defaultValue', 'defaultValue');
  t.end();
});

test('ignore files', function (t) {
  const conf = config({folder: './test/config', strict: false, exclude: ['exclude.js']});
  t.equal(conf.value('exclude.prop'), undefined);
  t.end();
});

test('throw errors in strict mode if can not find the conf value', function (t) {
  const conf = config({folder: './test/config'});
  try {
    conf.value('foo.bar');
    t.fail();
  } catch (e) {
    t.equal(e.message, 'could not find the configuration value');
    t.end();
  }
});