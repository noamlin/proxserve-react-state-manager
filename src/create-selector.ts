import { Proxserve } from 'proxserve';
import { invokePathsFunction } from './helpers';
import type { PRSMClassType, UseGetOptions } from './types';

type CSThis<T> = {
    instance: PRSMClassType<T>;
    path: string;
};

export function unboundCreateSelector<TargetType, TSelected>(
    pathFunction: (obj: TargetType) => any, // notice we are expecting to get a functions that returns only one path
) {
    const self = this as CSThis<TargetType>;
    // `self.path` is the accumulating path. acts as a prefix path.
    const paths2observe = invokePathsFunction(pathFunction, self.path);
    const parsedPath = paths2observe[0]; // the "final" path the user meant to get to

    function get(): TSelected {
        const proxy = self.instance.get();
        let evaluatedValue = undefined as TSelected;
        try {
            const { value } = Proxserve.evalPath(proxy, parsedPath);
            evaluatedValue = value;
        } catch (err) {
            // console.error(err);
        }
        // NOTE: wrong path will lead to returning undefined, even though typescript is thinks otherwise
        return evaluatedValue;
    }

    function useGet(
        pathsFunction?: (obj: TSelected) => any,
        options?: UseGetOptions,
    ): TSelected {
        const paths2observe = invokePathsFunction(pathsFunction, parsedPath);
        if (paths2observe.length > 0) {
            // just listens to the right path
            self.instance.useGet(() => paths2observe[0], options) as TSelected;
        }

        return get();
    }

    return {
        get,
        useGet,
        // createSelector: unboundCreateSelector,
    };
}
