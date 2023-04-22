import { Proxserve } from 'proxserve';
import { invokePathsFunction } from './helpers';
import type { PRSMClassType, UseGetOptions } from './types';

type CSThis<T> = {
    instance: PRSMClassType<T>;
    path: string;
};

export function unboundCreateSelector<TargetType, TSelected = unknown>(
    pathFunction: (obj: TargetType) => TSelected, // NOTE: we are expecting to get a function that returns only one path
) {
    const self = this as CSThis<TargetType>;
    // `self.path` is the accumulating path. it will act as a prefix path.
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
        // NOTE: wrong path will lead to returning undefined, even though typescript will think otherwise
        return evaluatedValue;
    }

    function useGet(
        pathsFunction?: (state: TSelected) => any,
        options?: UseGetOptions,
    ): TSelected {
        const paths2observe = invokePathsFunction(pathsFunction, parsedPath);
        if (paths2observe.length > 0) {
            // this `instance.useGet` just listens to the correct path. its return is not useful.
            self.instance.useGet(() => paths2observe[0], options) as TSelected;
        }

        return get();
    }

    return {
        get,
        useGet,
        createSelector: function createSelector<TSelectedInner = unknown>(pathFunction: (obj: TSelected) => TSelectedInner) {
            const createSelectorFunc = unboundCreateSelector.bind({
                instance: self.instance,
                path: parsedPath,
            });
            return createSelectorFunc<TSelected, TSelectedInner>(pathFunction);
        },
    };
}
