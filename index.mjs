import fs from 'fs';
import path from 'path';

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

export default ({directory = './conf'} = {directory: './conf'}) => {
	const files = fs.readdirSync(path.resolve(process.cwd(), directory))
		.map(file => file.split('.')[0]);

	const confObject = {};
	const env = process.env.NODE_ENV || 'dev';

	for (const f of files) {
		const vals = require(path.resolve(process.cwd(), directory, f));
		const defaultVals = vals['default'] || {};
		const envVals = vals[env] || {};
		confObject[f] = Object.freeze(Object.assign({}, defaultVals, envVals));
	}

	Object.freeze(confObject);
	return path => recursiveGet(confObject, path.split('.'));
}