import { Proxserve } from 'proxserve';
import type { ProxserveInstance } from 'proxserve';
import { useEffect, useReducer } from 'react';
import {
    validateParsePaths, quickUidGenerate,
    makePathGeneratorProxy, invokePathsFunction,
} from './helpers';
import { unboundCreateSelector } from './create-selector';
import { STATUS } from './constants';
import type { InitOptions, UseGetOptions, PRSMClassType} from './types';

export default class PRSM <TargetType> implements PRSMClassType<TargetType> {
    name: string;

    status: STATUS;

    private target: TargetType;

    private proxy: ProxserveInstance & TargetType;

    constructor(name: string) {
        this.name = name;
        this.status = STATUS.uninitialized;
        // initialize as a fallback
        this.target = {} as TargetType;
        this.proxy = Proxserve.make<TargetType>(this.target as object, {name});
    }

    init(obj: TargetType, options?: InitOptions): void {
        if (typeof obj === 'object' && obj !== null) { // whether it's an object or array
            this.destroy();
            this.target = obj;
            this.proxy = Proxserve.make<TargetType>(
                this.target as object,
                {
                    name: this.name,
                    debug: {
                        trace: options?.trace || 'none'
                    }
                },
            )
            this.status = STATUS.active;
        }
    }

    get(): ProxserveInstance & TargetType {
        return this.proxy;
    }

    useGet(
        pathsFunction?: (obj: TargetType) => any,
        options: UseGetOptions = { deep: false },
    ): ProxserveInstance & TargetType {
        // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
        const [, forceUpdate] = useReducer(x => x + 1, 0);

        const paths2observe = invokePathsFunction(pathsFunction);

        useEffect(() => {
            if (paths2observe.length === 0 || this.status === STATUS.destroyed) {
                return;
            }

            // should be random enough for us
            const randomId = quickUidGenerate();

            paths2observe.forEach((path) => {
                this.proxy.on({
                    event: 'change',
                    path,
                    id: randomId,
                    listener: forceUpdate,
                    deep: options.deep,
                });
            });

            return () => { // cleanup on unmount
                this.proxy.removeListener({ id: randomId })
            }
        }, []);

        return this.proxy;
    }

    createSelector<TSelected = unknown>(pathFunction: (obj: TargetType) => TSelected) {
        const createSelector = unboundCreateSelector.bind({
            instance: this,
            path: '',
        });
        return createSelector<TargetType, TSelected>(pathFunction);
    }

    destroy(): void {
        Proxserve.destroy(this.proxy);
        this.status = STATUS.destroyed;
    }
}
