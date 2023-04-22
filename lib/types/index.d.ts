import type { ProxserveInstance } from 'proxserve';
import { STATUS } from './constants';
import type { InitOptions, UseGetOptions, PRSMClassType } from './types';
export default class PRSM<TargetType> implements PRSMClassType<TargetType> {
    name: string;
    status: STATUS;
    private target;
    private proxy;
    constructor(name: string);
    init(state: TargetType, options?: InitOptions): void;
    get(): ProxserveInstance & TargetType;
    useGet(pathsFunction?: (state: TargetType) => any, options?: UseGetOptions): ProxserveInstance & TargetType;
    createSelector<TSelected = unknown>(pathFunction: (state: TargetType) => TSelected): {
        get: () => TSelected;
        useGet: (pathsFunction?: ((state: TSelected) => any) | undefined, options?: UseGetOptions | undefined) => TSelected;
        createSelector: <TSelectedInner = unknown>(pathFunction: (obj: TSelected) => TSelectedInner) => {
            get: () => TSelectedInner;
            useGet: (pathsFunction?: ((state: TSelectedInner) => any) | undefined, options?: UseGetOptions | undefined) => TSelectedInner;
            createSelector: <TSelectedInner_1 = unknown>(pathFunction: (obj: TSelectedInner) => TSelectedInner_1) => {
                get: () => TSelectedInner_1;
                useGet: (pathsFunction?: ((state: TSelectedInner_1) => any) | undefined, options?: UseGetOptions | undefined) => TSelectedInner_1;
                createSelector: <TSelectedInner_2 = unknown>(pathFunction: (obj: TSelectedInner_1) => TSelectedInner_2) => {
                    get: () => TSelectedInner_2;
                    useGet: (pathsFunction?: ((state: TSelectedInner_2) => any) | undefined, options?: UseGetOptions | undefined) => TSelectedInner_2;
                    createSelector: <TSelectedInner_3 = unknown>(pathFunction: (obj: TSelectedInner_2) => TSelectedInner_3) => {
                        get: () => TSelectedInner_3;
                        useGet: (pathsFunction?: ((state: TSelectedInner_3) => any) | undefined, options?: UseGetOptions | undefined) => TSelectedInner_3;
                        createSelector: <TSelectedInner_4 = unknown>(pathFunction: (obj: TSelectedInner_3) => TSelectedInner_4) => {
                            get: () => TSelectedInner_4;
                            useGet: (pathsFunction?: ((state: TSelectedInner_4) => any) | undefined, options?: UseGetOptions | undefined) => TSelectedInner_4;
                            createSelector: <TSelectedInner_5 = unknown>(pathFunction: (obj: TSelectedInner_4) => TSelectedInner_5) => {
                                get: () => TSelectedInner_5;
                                useGet: (pathsFunction?: ((state: TSelectedInner_5) => any) | undefined, options?: UseGetOptions | undefined) => TSelectedInner_5;
                                createSelector: <TSelectedInner_6 = unknown>(pathFunction: (obj: TSelectedInner_5) => TSelectedInner_6) => {
                                    get: () => TSelectedInner_6;
                                    useGet: (pathsFunction?: ((state: TSelectedInner_6) => any) | undefined, options?: UseGetOptions | undefined) => TSelectedInner_6;
                                    createSelector: <TSelectedInner_7 = unknown>(pathFunction: (obj: TSelectedInner_6) => TSelectedInner_7) => {
                                        get: () => TSelectedInner_7;
                                        useGet: (pathsFunction?: ((state: TSelectedInner_7) => any) | undefined, options?: UseGetOptions | undefined) => TSelectedInner_7;
                                        createSelector: <TSelectedInner_8 = unknown>(pathFunction: (obj: TSelectedInner_7) => TSelectedInner_8) => {
                                            get: () => TSelectedInner_8;
                                            useGet: (pathsFunction?: ((state: TSelectedInner_8) => any) | undefined, options?: UseGetOptions | undefined) => TSelectedInner_8;
                                            createSelector: <TSelectedInner_9 = unknown>(pathFunction: (obj: TSelectedInner_8) => TSelectedInner_9) => {
                                                get: () => TSelectedInner_9;
                                                useGet: (pathsFunction?: ((state: TSelectedInner_9) => any) | undefined, options?: UseGetOptions | undefined) => TSelectedInner_9;
                                                createSelector: <TSelectedInner_10 = unknown>(pathFunction: (obj: TSelectedInner_9) => TSelectedInner_10) => any;
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
    destroy(): void;
}
