import {test} from 'zora';
import {load as config} from '../src/index';

test('load config: should return a getter function', t => {
    const conf = config({directory: './test/config'});
    t.equal(conf('foo.prop'), 'value', 'should return the value for ./test/config/foo.js');
    t.equal(conf('bar.another.thing'), 'yeah', 'should work on nested value');
});

test('throws error if can not find the conf value', t => {
    const conf = config({directory: './test/config'});
    t.throws(() => conf('foo.bar'), 'missing "bar" part in the config');
});

test('throw error if modify conf in strict mode', t => {
    'use strict';
    const conf = config({directory: './test/config'});
    t.throws(() => {
        conf('bar.another').thing = 'woot';
    }, TypeError);
});

test('return undefined if invalid path with non strict flag', t => {
    const conf = config({directory: './test/config', strict: false});
    t.eq(conf('foo.bar'), undefined, 'should be undefined');
});
