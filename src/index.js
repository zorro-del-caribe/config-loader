"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const deepClone = (object) => JSON.parse(JSON.stringify(object));
const deepFreeze = (object) => {
    const propNames = Object.getOwnPropertyNames(object);
    for (let name of propNames) {
        const value = object[name];
        object[name] = value && typeof value === 'object' ?
            deepFreeze(value) : value;
    }
    return Object.freeze(object);
};
const recursiveGet = (target, path, { strict = true }) => {
    const [next, ...rest] = path.split('.');
    if ((next in target) === false) {
        if (strict) {
            throw new Error(`missing "${next}" part in the config`);
        }
        return void 0;
    }
    if (rest.length === 0) {
        return target[next];
    }
    return recursiveGet(target[next], rest.join('.'), { strict });
};
exports.load = (opts = { directory: './src/conf/', strict: true }) => {
    const { directory, strict } = opts;
    const object = {};
    for (const file of fs_1.readdirSync(directory).filter(f => f.split('.').reverse()[0] === 'js')) {
        const [name, ...rest] = file.split('.');
        object[name] = deepClone(require(path_1.resolve(process.cwd(), directory, file)));
    }
    const confObject = deepFreeze(object);
    return (path) => recursiveGet(confObject, path, { strict });
};
