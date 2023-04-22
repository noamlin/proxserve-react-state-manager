import type { ProxserveInstance } from 'proxserve';
import type { STATUS } from './constants';
import { unboundCreateSelector } from './create-selector';
export type InitOptions = {
    trace: 'none' | 'normal' | 'verbose';
};
export type UseGetOptions = {
    deep: boolean;
};
export interface PRSMClassType<TargetType> {
    name: string;
    status: STATUS;
    init(state: TargetType, options?: InitOptions): void;
    get(): ProxserveInstance & TargetType;
    useGet(pathsFunction?: (state: TargetType) => any, options?: UseGetOptions): ProxserveInstance & TargetType;
    createSelector<TSelected = unknown>(pathFunction: (state: TargetType) => TSelected): {
        get: () => TSelected;
        useGet: (pathsFunction?: ((state: TSelected) => any) | undefined, options?: UseGetOptions) => TSelected;
        createSelector: <TSelectedInner = unknown>(pathFunction: (state: TSelected) => TSelectedInner) => ReturnType<typeof unboundCreateSelector>;
    };
    destroy(): void;
}
