import {Proxserve as $g568T$Proxserve} from "proxserve";
import {useReducer as $g568T$useReducer, useEffect as $g568T$useEffect} from "react";



function $c05fdd5a5934bbca$var$validateIsPathGeneratorObject(object) {
    return typeof object === "object" && object !== null && typeof object.__$propertyPath === "string";
}
function $c05fdd5a5934bbca$export$34a7e66e105c28c1(pathsFunctionOutput) {
    if ($c05fdd5a5934bbca$var$validateIsPathGeneratorObject(pathsFunctionOutput)) // got a single path-object so put it in an array
    return [
        pathsFunctionOutput.__$propertyPath
    ];
    else if (Array.isArray(pathsFunctionOutput)) // got an array so return it after filtering out invalid items
    return pathsFunctionOutput.filter((value)=>$c05fdd5a5934bbca$var$validateIsPathGeneratorObject(value));
    // got invalid output
    return undefined;
}
function $c05fdd5a5934bbca$export$eb54bb77bf1a5122() {
    return Math.random().toString().slice(2, 10) + Math.random().toString().slice(2, 10) + Math.random().toString().slice(2, 10);
}
function $c05fdd5a5934bbca$export$72eb31160658ffbe(path = "") {
    const proxy = new Proxy({
        __$propertyPath: path
    }, {
        get: (target, property, proxy)=>{
            if (property === "__$propertyPath") return target.__$propertyPath;
            return $c05fdd5a5934bbca$export$72eb31160658ffbe(`${path}.${property}`);
        }
    });
    return proxy;
}


let $efab94fd907c7f35$var$STATUS;
(function(STATUS) {
    STATUS[STATUS["uninitialized"] = 0] = "uninitialized";
    STATUS[STATUS["active"] = 1] = "active";
    STATUS[STATUS["destroyed"] = 2] = "destroyed";
})($efab94fd907c7f35$var$STATUS || ($efab94fd907c7f35$var$STATUS = {}));
class $efab94fd907c7f35$export$6d403fe7ebebae6d {
    constructor(name){
        this.name = name;
        this.status = $efab94fd907c7f35$var$STATUS.uninitialized;
        // initialize as a fallback
        this.target = {};
        this.proxy = (0, $g568T$Proxserve).make(this.target, {
            name: name
        });
    }
    init(obj, options) {
        if (typeof obj === "object" && obj !== null) {
            this.destroy();
            this.target = obj;
            this.proxy = (0, $g568T$Proxserve).make(this.target, {
                name: this.name,
                debug: {
                    trace: options?.trace || "none"
                }
            });
            this.status = $efab94fd907c7f35$var$STATUS.active;
        }
    }
    useGet(pathsFunction) {
        // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
        const [, forceUpdate] = (0, $g568T$useReducer)((x)=>x + 1, 0);
        let paths2observe;
        if (typeof pathsFunction === "function") {
            const pathGeneratorObject = (0, $c05fdd5a5934bbca$export$72eb31160658ffbe)();
            const output = pathsFunction(pathGeneratorObject);
            paths2observe = (0, $c05fdd5a5934bbca$export$34a7e66e105c28c1)(output);
        }
        (0, $g568T$useEffect)(()=>{
            if (!paths2observe || this.status === $efab94fd907c7f35$var$STATUS.destroyed) return;
            // should be random enough for us
            const randomId = (0, $c05fdd5a5934bbca$export$eb54bb77bf1a5122)();
            paths2observe.forEach((path)=>{
                this.proxy.on({
                    event: "change",
                    path: path,
                    id: randomId,
                    listener: forceUpdate
                });
            });
            return function cleanup() {
                this.proxy.removeListener({
                    id: randomId
                });
            };
        }, []);
        return this.proxy;
    }
    destroy() {
        (0, $g568T$Proxserve).destroy(this.proxy);
        this.status = $efab94fd907c7f35$var$STATUS.destroyed;
    }
}


export {$efab94fd907c7f35$export$6d403fe7ebebae6d as PRSM};
