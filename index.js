'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const recursiveGet = (ctx, parts = []) => {
	const current = parts.shift();

	if (current === undefined) {
		return ctx;
	}

	const val = ctx[current];

	if (val === undefined) {
		throw new Error(`Invalid configuration path`);
	}

	return recursiveGet(val, parts);
};

exports.default = ({ directory = './conf' } = { directory: './conf' }) => {
	const files = _fs2.default.readdirSync(_path2.default.resolve(process.cwd(), directory)).map(file => file.split('.')[0]);

	const confObject = {};
	const env = process.env.NODE_ENV || 'dev';

	for (const f of files) {
		const vals = require(_path2.default.resolve(process.cwd(), directory, f));
		const defaultVals = vals['default'] || {};
		const envVals = vals[env] || {};
		confObject[f] = Object.freeze(Object.assign({}, defaultVals, envVals));
	}

	Object.freeze(confObject);
	return path => recursiveGet(confObject, path.split('.'));
};