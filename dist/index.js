import { Proxserve } from 'proxserve';
import { useReducer, useEffect } from 'react';

function validateIsPathGeneratorObject(object) {
    return (typeof object === 'object' &&
        object !== null &&
        typeof object.__$propertyPath === 'string');
}
function validateParsePathsFunction(pathsFunctionOutput) {
    if (validateIsPathGeneratorObject(pathsFunctionOutput)) {
        // got a single path-object so put it in an array
        return [pathsFunctionOutput.__$propertyPath];
    }
    else if (Array.isArray(pathsFunctionOutput)) {
        // got an array so return it after filtering out invalid items
        return pathsFunctionOutput.filter((value) => validateIsPathGeneratorObject(value));
    }
    // got invalid output
    return undefined;
}
function quickUidGenerate() {
    return Math.random().toString().slice(2, 10)
        + Math.random().toString().slice(2, 10)
        + Math.random().toString().slice(2, 10);
}
function makePathGeneratorProxy(path = '') {
    const proxy = new Proxy({ __$propertyPath: path }, {
        get: (target, property, proxy) => {
            if (property === '__$propertyPath') {
                return target.__$propertyPath;
            }
            return makePathGeneratorProxy(`${path}.${property}`);
        },
    });
    return proxy;
}

var STATUS;
(function (STATUS) {
    STATUS[STATUS["uninitialized"] = 0] = "uninitialized";
    STATUS[STATUS["active"] = 1] = "active";
    STATUS[STATUS["destroyed"] = 2] = "destroyed";
})(STATUS || (STATUS = {}));
class PRSM {
    constructor(name) {
        this.name = name;
        this.status = STATUS.uninitialized;
        // initialize as a fallback
        this.target = {};
        this.proxy = Proxserve.make(this.target, { name });
    }
    init(obj, options) {
        if (typeof obj === 'object' && obj !== null) { // whether it's an object or array
            this.destroy();
            this.target = obj;
            this.proxy = Proxserve.make(this.target, {
                name: this.name,
                debug: {
                    trace: (options === null || options === void 0 ? void 0 : options.trace) || 'none'
                }
            });
            this.status = STATUS.active;
        }
    }
    useGet(pathsFunction) {
        // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
        const [, forceUpdate] = useReducer(x => x + 1, 0);
        let paths2observe;
        if (typeof pathsFunction === 'function') {
            const pathGeneratorObject = makePathGeneratorProxy();
            const output = pathsFunction(pathGeneratorObject);
            paths2observe = validateParsePathsFunction(output);
        }
        useEffect(() => {
            if (!paths2observe || this.status === STATUS.destroyed) {
                return;
            }
            // should be random enough for us
            const randomId = quickUidGenerate();
            paths2observe.forEach((path) => {
                this.proxy.on({
                    event: 'change',
                    path,
                    id: randomId,
                    listener: forceUpdate,
                });
            });
            return function cleanup() {
                this.proxy.removeListener({ id: randomId });
            };
        }, []);
        return this.proxy;
    }
    destroy() {
        Proxserve.destroy(this.proxy);
        this.status = STATUS.destroyed;
    }
}

export { PRSM };
