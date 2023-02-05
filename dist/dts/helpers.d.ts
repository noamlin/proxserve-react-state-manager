type PathGeneratorProxy = {
    __$propertyPath: string;
};
export declare function validateParsePathsFunction(pathsFunctionOutput: unknown): string[] | undefined;
export declare function quickUidGenerate(): string;
export declare function makePathGeneratorProxy(path?: string): PathGeneratorProxy;
export {};
