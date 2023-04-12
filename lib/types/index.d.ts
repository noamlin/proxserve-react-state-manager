import type { ProxserveInstance } from 'proxserve';
declare type initOptions = {
    trace: 'none' | 'normal' | 'verbose';
};
declare enum STATUS {
    uninitialized = 0,
    active = 1,
    destroyed = 2
}
export default class PRSM<TargetType extends object> {
    name: string;
    status: STATUS;
    private target;
    private proxy;
    constructor(name: string);
    init(obj: TargetType, options?: initOptions): void;
    get(): ProxserveInstance & TargetType;
    useGet(pathsFunction?: (obj: TargetType) => any | any[], options?: {
        deep: boolean;
    }): ProxserveInstance & TargetType;
    destroy(): void;
}
export {};
