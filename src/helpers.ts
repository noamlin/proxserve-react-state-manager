type PathGeneratorProxy = {
    __$propertyPath: string;
};

function validateIsPathGeneratorObject(object: any): object is PathGeneratorProxy {
    return (
        typeof object === 'object' &&
        object !== null &&
        typeof (object as PathGeneratorProxy).__$propertyPath === 'string'
    );
}

export function validateParsePaths(pathsFunctionOutput: any): string[] {
    const outputs = Array.isArray(pathsFunctionOutput) ? pathsFunctionOutput : [pathsFunctionOutput];
    const parsed: string[] = [];
    
    outputs.forEach((output) => {
        if (validateIsPathGeneratorObject(output)) {
            parsed.push(output.__$propertyPath);
        } else if (typeof output === 'string') {
            // in case someone entered a `pathsFunction` that returns string(s) explicitly
            parsed.push(output);
        }
    });

    return parsed;
}

export function quickUidGenerate(): string {
    if (crypto?.randomUUID) {
        return crypto.randomUUID();
    }
    return Math.random().toString();
}

export function makePathGeneratorProxy(path: string = '') {
    const proxy = new Proxy({ __$propertyPath: path }, {
        get: (target: {[prop: string]: any}, property: string, proxy) => {
            if (property === '__$propertyPath') {
                return target.__$propertyPath;
            }
            return makePathGeneratorProxy(`${path}.${property}`);
        },
    }) as PathGeneratorProxy;

    return proxy;
}

export function invokePathsFunction(
    pathsFunction?: (obj: any) => any,
    path?: string,
): string[] {
    let paths2observe: string[] = [];
    if (typeof pathsFunction === 'function') {
        const pathGeneratorObject = makePathGeneratorProxy(path);
        const outputs = pathsFunction(pathGeneratorObject);
        paths2observe = validateParsePaths(outputs);
    }
    return paths2observe;
}