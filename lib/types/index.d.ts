import type { ProxserveInstance } from 'proxserve';
import { STATUS } from './constants';
import type { InitOptions, UseGetOptions, PRSMClassType } from './types';
export default class PRSM<TargetType> implements PRSMClassType<TargetType> {
    name: string;
    status: STATUS;
    private target;
    private proxy;
    constructor(name: string);
    init(obj: TargetType, options?: InitOptions): void;
    get(): ProxserveInstance & TargetType;
    useGet(pathsFunction?: (obj: TargetType) => any, options?: UseGetOptions): ProxserveInstance & TargetType;
    createSelector<TSelected = unknown>(pathFunction: (obj: TargetType) => TSelected): {
        get: () => TSelected;
        useGet: (pathsFunction?: ((obj: TSelected) => any) | undefined, options?: UseGetOptions | undefined) => TSelected;
    };
    destroy(): void;
}
