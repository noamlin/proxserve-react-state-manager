import type { ProxserveInstance } from 'proxserve';
import type { STATUS } from './constants';
export type InitOptions = {
    trace: 'none' | 'normal' | 'verbose';
};
export type UseGetOptions = {
    deep: boolean;
};
export interface PRSMClassType<TargetType> {
    name: string;
    status: STATUS;
    init(obj: TargetType, options?: InitOptions): void;
    get(): ProxserveInstance & TargetType;
    useGet(pathsFunction?: (obj: TargetType) => any, options?: UseGetOptions): ProxserveInstance & TargetType;
    createSelector<TSelected = unknown>(pathFunction: (obj: TargetType) => TSelected): {
        get: () => TSelected;
        useGet: (pathsFunction?: ((obj: TSelected) => any) | undefined, options?: UseGetOptions) => TSelected;
    };
    destroy(): void;
}
