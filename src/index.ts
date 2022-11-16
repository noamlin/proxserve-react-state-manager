import { Proxserve } from 'proxserve';
import type {
	TargetVariable,
	ProxserveInstanceMetadata,
} from 'proxserve';

export class PRSM <TargetType>{
    target = {} as TargetType;

    constructor (obj: TargetType) {
        this.target = obj;
    }
}