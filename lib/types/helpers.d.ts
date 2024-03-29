type PathGeneratorProxy = {
    __$propertyPath: string;
};
export declare function validateParsePaths(pathsFunctionOutput: any): string[];
export declare function quickUidGenerate(): string;
export declare function makePathGeneratorProxy(path?: string): PathGeneratorProxy;
export declare function invokePathsFunction(pathsFunction?: (obj: any) => any, path?: string): string[];
export {};
