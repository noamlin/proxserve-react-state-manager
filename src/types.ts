import type { ProxserveInstance } from 'proxserve';
import type { STATUS } from './constants';
import { unboundCreateSelector } from './create-selector';

export type InitOptions = {
    trace: 'none' | 'normal' | 'verbose';
};

export type UseGetOptions = { deep: boolean };

export interface PRSMClassType<TargetType> {
    name: string;
    status: STATUS;
    init(state: TargetType, options?: InitOptions): void;
    get(): ProxserveInstance & TargetType;
    useGet(
        pathsFunction?: (state: TargetType) => any,
        options?: UseGetOptions,
    ): ProxserveInstance & TargetType;
    createSelector<TSelected = unknown>(pathFunction: (state: TargetType) => TSelected): {
        get: () => TSelected;
        useGet: (pathsFunction?: ((state: TSelected) => any) | undefined, options?: UseGetOptions) => TSelected;
        // WARNING: the `createSelector` returning a `createSelector` recursion is an infinite loop for typescript.
        // when compiling, the declaration file will manually write 10 nested returns of `createSelector => createSelector`
        // and after the 10th it will just return `any`. meaning that in very rare cases, users who will create
        // a selector from a selector 10 times will eventually lost the type inference and will end up with `state: any`.
        createSelector: <TSelectedInner = unknown>(pathFunction: (state: TSelected) => TSelectedInner) => ReturnType<typeof unboundCreateSelector>;
    };
    destroy(): void;
}