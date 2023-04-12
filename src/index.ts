import { Proxserve } from 'proxserve';
import type { ProxserveInstance } from 'proxserve';
import { useEffect, useReducer } from 'react';
import { validateParsePaths, quickUidGenerate, makePathGeneratorProxy } from './helpers';

type initOptions = {
    trace: 'none' | 'normal' | 'verbose';
};

enum STATUS {
    uninitialized,
    active,
    destroyed,
}

export default class PRSM <TargetType extends object>{
    name: string;

    status: STATUS;

    private target: TargetType;

    private proxy: ProxserveInstance & TargetType;

    constructor(name: string) {
        this.name = name;
        this.status = STATUS.uninitialized;
        // initialize as a fallback
        this.target = {} as TargetType;
        this.proxy = Proxserve.make<TargetType>(this.target, {name});
    }

    init(obj: TargetType, options?: initOptions): void {
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
        pathsFunction?: (obj: TargetType) => any | any[],
        options: { deep: boolean } = { deep: false },
    ): ProxserveInstance & TargetType {
        // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
        const [, forceUpdate] = useReducer(x => x + 1, 0);

        let paths2observe: string[] | undefined;
        if (typeof pathsFunction === 'function') {
            const pathGeneratorObject = makePathGeneratorProxy();
            const outputs = pathsFunction(pathGeneratorObject as TargetType);
            paths2observe = validateParsePaths(outputs);
        }

        useEffect(() => {
            if (!paths2observe || paths2observe.length === 0 || this.status === STATUS.destroyed) {
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

    destroy(): void {
        Proxserve.destroy(this.proxy);
        this.status = STATUS.destroyed;
    }
}
