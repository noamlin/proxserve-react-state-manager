import { ProxserveInstance } from "proxserve";
type initOptions = {
    trace: 'none' | 'normal' | 'verbose';
};
enum STATUS {
    uninitialized = 0,
    active = 1,
    destroyed = 2
}
export class PRSM<TargetType extends {}> {
    name: string;
    status: STATUS;
    constructor(name: string);
    init(obj: TargetType, options?: initOptions): void;
    useGet(pathsFunction?: (obj: any) => any | any[]): ProxserveInstance & TargetType;
    destroy(): void;
}

//# sourceMappingURL=index.d.ts.map
