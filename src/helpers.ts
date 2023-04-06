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
        }
    });

    return parsed;
}

export function quickUidGenerate(): string {
    if (crypto?.randomUUID) {
        return crypto.randomUUID();
    }
    return Math.random().toString().slice(2, 10)
    + Math.random().toString().slice(2, 10);
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