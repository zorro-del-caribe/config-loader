const fs = require('fs');
const path = require('path');

module.exports = function (options = {}) {
  const env = process.env.NODE_ENV || 'development';
  const opts = Object.assign({folder: './config', exclude: [], strict: true}, options);
  const folderPath = path.join(process.cwd(), opts.folder);

  const configFiles = fs.readdirSync(folderPath)
    .filter(f=>opts.exclude.indexOf(f) === -1);

  const config = {};

  for (const file of configFiles) {
    const [namespace,extension]=file.split('.');
    const conf = require(path.join(folderPath, file));
    config[namespace] = Object.assign({}, conf.default || {}, conf[env] || {});
  }

  return Object.create({
    value(path){
      const val = recursiveGet(config, ...path.split('.'));
      if (val === undefined && opts.strict === true) {
        throw new Error('could not find the configuration value');
      }
      return val;
    }
  });
};

function recursiveGet (ctx, ...parts) {
  const [first, ...others] = parts;
  return !others.length || ctx[first] === undefined ? ctx[first] : recursiveGet(ctx[first], ...others);
}