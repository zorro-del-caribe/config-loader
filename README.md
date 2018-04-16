# conf-load

[![CircleCI](https://circleci.com/gh/zorro-del-caribe/config-loader.svg?style=svg)](https://circleci.com/gh/zorro-del-caribe/config-loader)

load namespaced configuration based on convention and environment variable (nodejs)

## install 

``npm install conf-load``

## usage

assuming you have

```
.
|
|---conf
|     |----foo.js
|     |----bar.js

```

foo.js and bar.js following the pattern

```javascript
exports.default ={
   prop:'value',
   other:'bar'
};

exports.production = {
   prop:'overwrite in prod'
};
```

then use **conf-load**
 
 ```javascript
 const conf = require('conf-load')(); // can pass options here
 
 conf('foo.prop') // 'overwrite in prod' if NODE_ENV is set to 'production' or 'value' otherwise
 ```
 
 options to path the factory
 
 * directory: the folder to read through to find the config files (default './conf')