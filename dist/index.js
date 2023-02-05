var $kFpQG$proxserve = require("proxserve");
var $kFpQG$react = require("react");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "PRSM", () => $d3ef6a716a1b9946$export$6d403fe7ebebae6d);


function $03327623ed646d3d$var$validateIsPathGeneratorObject(object) {
    return typeof object === "object" && object !== null && typeof object.__$propertyPath === "string";
}
function $03327623ed646d3d$export$34a7e66e105c28c1(pathsFunctionOutput) {
    if ($03327623ed646d3d$var$validateIsPathGeneratorObject(pathsFunctionOutput)) // got a single path-object so put it in an array
    return [
        pathsFunctionOutput.__$propertyPath
    ];
    else if (Array.isArray(pathsFunctionOutput)) // got an array so return it after filtering out invalid items
    return pathsFunctionOutput.filter((value)=>$03327623ed646d3d$var$validateIsPathGeneratorObject(value));
    // got invalid output
    return undefined;
}
function $03327623ed646d3d$export$eb54bb77bf1a5122() {
    return Math.random().toString().slice(2, 10) + Math.random().toString().slice(2, 10) + Math.random().toString().slice(2, 10);
}
function $03327623ed646d3d$export$72eb31160658ffbe(path = "") {
    const proxy = new Proxy({
        __$propertyPath: path
    }, {
        get: (target, property, proxy)=>{
            if (property === "__$propertyPath") return target.__$propertyPath;
            return $03327623ed646d3d$export$72eb31160658ffbe(`${path}.${property}`);
        }
    });
    return proxy;
}


let $d3ef6a716a1b9946$var$STATUS;
(function(STATUS) {
    STATUS[STATUS["uninitialized"] = 0] = "uninitialized";
    STATUS[STATUS["active"] = 1] = "active";
    STATUS[STATUS["destroyed"] = 2] = "destroyed";
})($d3ef6a716a1b9946$var$STATUS || ($d3ef6a716a1b9946$var$STATUS = {}));
class $d3ef6a716a1b9946$export$6d403fe7ebebae6d {
    constructor(name){
        this.name = name;
        this.status = $d3ef6a716a1b9946$var$STATUS.uninitialized;
        // initialize as a fallback
        this.target = {};
        this.proxy = (0, $kFpQG$proxserve.Proxserve).make(this.target, {
            name: name
        });
    }
    init(obj, options) {
        if (typeof obj === "object" && obj !== null) {
            this.destroy();
            this.target = obj;
            this.proxy = (0, $kFpQG$proxserve.Proxserve).make(this.target, {
                name: this.name,
                debug: {
                    trace: options?.trace || "none"
                }
            });
            this.status = $d3ef6a716a1b9946$var$STATUS.active;
        }
    }
    useGet(pathsFunction) {
        // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
        const [, forceUpdate] = (0, $kFpQG$react.useReducer)((x)=>x + 1, 0);
        let paths2observe;
        if (typeof pathsFunction === "function") {
            const pathGeneratorObject = (0, $03327623ed646d3d$export$72eb31160658ffbe)();
            const output = pathsFunction(pathGeneratorObject);
            paths2observe = (0, $03327623ed646d3d$export$34a7e66e105c28c1)(output);
        }
        (0, $kFpQG$react.useEffect)(()=>{
            if (!paths2observe || this.status === $d3ef6a716a1b9946$var$STATUS.destroyed) return;
            // should be random enough for us
            const randomId = (0, $03327623ed646d3d$export$eb54bb77bf1a5122)();
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
        (0, $kFpQG$proxserve.Proxserve).destroy(this.proxy);
        this.status = $d3ef6a716a1b9946$var$STATUS.destroyed;
    }
}


