type PathGeneratorProxy = {
    __$propertyPath: string;
};

function validateIsPathGeneratorObject(object: unknown) {
    return (
        typeof object === 'object' &&
        object !== null &&
        typeof (object as PathGeneratorProxy).__$propertyPath === 'string'
    );
}

export function validateParsePathsFunction(pathsFunctionOutput: unknown): string[] | undefined {
    if (validateIsPathGeneratorObject(pathsFunctionOutput)) {
        // got a single path-object so put it in an array
        return [(pathsFunctionOutput as PathGeneratorProxy).__$propertyPath];
    } else if (Array.isArray(pathsFunctionOutput)) {
        // got an array so return it after filtering out invalid items
        return pathsFunctionOutput.filter((value: unknown) => validateIsPathGeneratorObject(value));
    }
    // got invalid output
    return undefined;
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