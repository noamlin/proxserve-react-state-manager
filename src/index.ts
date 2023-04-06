import { Proxserve } from 'proxserve';
import type { ProxserveInstance } from 'proxserve';
import { useEffect, useReducer } from 'react';
import { validateParsePathsFunction, quickUidGenerate, makePathGeneratorProxy } from './helpers';

type initOptions = {
    trace: 'none' | 'normal' | 'verbose';
};

enum STATUS {
    uninitialized,
    active,
    destroyed,
}

export class PRSM <TargetType extends object>{
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

    useGet(pathsFunction?: (obj: TargetType) => any | any[]): ProxserveInstance & TargetType {
        // https://reactjs.org/docs/hooks-faq.html#is-there-something-like-forceupdate
        const [, forceUpdate] = useReducer(x => x + 1, 0);

        let paths2observe: string[] | undefined;
        if (typeof pathsFunction === 'function') {
            const pathGeneratorObject = makePathGeneratorProxy();
            const output = pathsFunction(pathGeneratorObject as TargetType);
            paths2observe = validateParsePathsFunction(output);
        }

        useEffect(() => {
            if (!paths2observe || this.status === STATUS.destroyed) {
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
                });
            });

            return function cleanup() {
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
