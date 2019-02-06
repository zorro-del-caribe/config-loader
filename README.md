# conf-load

[![CircleCI](https://circleci.com/gh/zorro-del-caribe/config-loader.svg?style=svg)](https://circleci.com/gh/zorro-del-caribe/config-loader)

load configuration based on namespaces and conventions.

## install

``npm install --save conf-load``

## usage

assuming you have

```
.
|
|---src
|   |---conf
|       |---foo.js
|       |---bar.js

```

with bar.js

```javascript
module.exports = {
    some: 'thing',
    another: {
        thing: 'yeah'
    }
};
```

and foo.js

```Javascript
module.exports = { prop: 'value', woot: 'woot-value' };
```

then use **conf-load**

 ```javascript
 const {load} = require('conf-load');
 const conf = load() // can pass options here

 conf('foo.prop'); // > 'value'
 conf('bar.another.thing'); // > 'yeah'
 ```

### options

* directory: string -> the folder to read through to find the config files (default './src/conf')
* strict: boolean -> whether it should throw if it can not find a conf value at the corresponding path (default true) otherwise it returns undefined
