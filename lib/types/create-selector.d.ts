import type { UseGetOptions } from './types';
export declare function unboundCreateSelector<TargetType, TSelected>(pathFunction: (obj: TargetType) => any): {
    get: () => TSelected;
    useGet: (pathsFunction?: ((obj: TSelected) => any) | undefined, options?: UseGetOptions) => TSelected;
};
