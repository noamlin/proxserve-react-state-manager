'use strict';

var proxserve = require('proxserve');
var react = require('react');

function validateIsPathGeneratorObject(object) {
    return (typeof object === 'object' &&
        object !== null &&
        typeof object.__$propertyPath === 'string');
}
function validateParsePaths(pathsFunctionOutput) {
    const outputs = Array.isArray(pathsFunctionOutput) ? pathsFunctionOutput : [pathsFunctionOutput];
    const parsed = [];
    outputs.forEach((output) => {
        if (validateIsPathGeneratorObject(output)) {
            parsed.push(output.__$propertyPath);
        }
    });
    return parsed;
}
function quickUidGenerate() {
    if (crypto === null || crypto === void 0 ? void 0 : crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return Math.random().toString();
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
        this.proxy = proxserve.Proxserve.make(this.target, { name });
    }
    init(obj, options) {
        if (typeof obj === 'object' && obj !== null) { // whether it's an object or array
            this.destroy();
            this.target = obj;
            this.proxy = proxserve.Proxserve.make(this.target, {
                name: this.name,
                debug: {
                    trace: (options === null || options === void 0 ? void 0 : options.trace) || 'none'
                }
            });
            this.status = STATUS.active;
        }
    }
    get() {
        return this.proxy;
    }
    useGet(pathsFunction, options = { deep: false }) {
        // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
        const [, forceUpdate] = react.useReducer(x => x + 1, 0);
        let paths2observe;
        if (typeof pathsFunction === 'function') {
            const pathGeneratorObject = makePathGeneratorProxy();
            const outputs = pathsFunction(pathGeneratorObject);
            paths2observe = validateParsePaths(outputs);
        }
        react.useEffect(() => {
            if (!paths2observe || paths2observe.length === 0 || this.status === STATUS.destroyed) {
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
                    deep: options.deep,
                });
            });
            return function cleanup() {
                this.proxy.removeListener({ id: randomId });
            };
        }, []);
        return this.proxy;
    }
    destroy() {
        proxserve.Proxserve.destroy(this.proxy);
        this.status = STATUS.destroyed;
    }
}

module.exports = PRSM;
