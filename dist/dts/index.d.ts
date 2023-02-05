import type { ProxserveInstance } from 'proxserve';
type initOptions = {
    trace: 'none' | 'normal' | 'verbose';
};
declare enum STATUS {
    uninitialized = 0,
    active = 1,
    destroyed = 2
}
export declare class PRSM<TargetType extends {}> {
    name: string;
    status: STATUS;
    private target;
    private proxy;
    constructor(name: string);
    init(obj: TargetType, options?: initOptions): void;
    useGet(pathsFunction?: (obj: any) => any | any[]): ProxserveInstance & TargetType;
    destroy(): void;
}
export {};
