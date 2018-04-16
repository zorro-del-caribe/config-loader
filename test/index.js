const test = require('zora');
const config = require('../index')['default'];

test('load config based on test env', t => {
	const conf = config({directory: './test/config'});
	t.equal(conf('foo.prop'), 'testValue', 'overwrite value');
	t.equal(conf('foo.defaultProp'), 'defaultValue', 'defaultValue');
});

test('throw errors if can not find the conf value', t => {
	const conf = config({directory: './test/config'});
	try {
		conf('foo.bar');
		t.fail();
	} catch (e) {
		t.equal(e.message, 'Invalid configuration path');
	}
});