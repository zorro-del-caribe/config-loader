"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zora_1 = require("zora");
const index_1 = require("../src/index");
zora_1.test('load config: should return a getter function', t => {
    const conf = index_1.load({ directory: './test/config' });
    t.equal(conf('foo.prop'), 'value', 'should return the value for ./test/config/foo.js');
    t.equal(conf('bar.another.thing'), 'yeah', 'should work on nested value');
});
zora_1.test('throws error if can not find the conf value', t => {
    const conf = index_1.load({ directory: './test/config' });
    t.throws(() => conf('foo.bar'), 'missing "bar" part in the config');
});
zora_1.test('throw error if modify conf in strict mode', t => {
    'use strict';
    const conf = index_1.load({ directory: './test/config' });
    t.throws(() => {
        conf('bar.another').thing = 'woot';
    }, TypeError);
});
zora_1.test('return undefined if invalid path with non strict flag', t => {
    const conf = index_1.load({ directory: './test/config', strict: false });
    t.eq(conf('foo.bar'), undefined, 'should be undefined');
});
