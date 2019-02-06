import {resolve} from 'path';
import {readdirSync} from 'fs';

interface ConfLoaderOptions {
    directory?: string;
    strict?: boolean;
}

const deepClone = (object: Object): Object => JSON.parse(JSON.stringify(object));

const deepFreeze = (object: Object): Object => {
    const propNames = Object.getOwnPropertyNames(object);

    for (let name of propNames) {
        const value = object[name];

        object[name] = value && typeof value === 'object' ?
            deepFreeze(value) : value;
    }

    return Object.freeze(object);
};

const recursiveGet = (target: Object, path: string, {strict = true}: { strict: boolean }) => {
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

    return recursiveGet(target[next], rest.join('.'), {strict});
};

export const load = (opts: ConfLoaderOptions = {directory: './src/conf/', strict: true}) => {
    const {directory, strict} = opts;
    const object = {};
    for (const file of readdirSync(directory).filter(f => f.split('.').reverse()[0] === 'js')) {
        const [name, ...rest] = file.split('.');
        object[name] = deepClone(require(resolve(process.cwd(), directory, file)));
    }
    const confObject = deepFreeze(object);
    return (path: string) => recursiveGet(confObject, path, {strict});
};
