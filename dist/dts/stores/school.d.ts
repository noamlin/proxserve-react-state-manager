import { PRSM } from '../index';
export type SchoolState = {
    name: string;
    address: {
        city: string;
        street: string;
        zipcode: number;
    };
    students: Array<{
        name: string;
        score: number;
    }>;
    teachers: Array<{
        name: string;
        salary: number;
    }>;
};
declare const schoolStore: PRSM<SchoolState>;
export default schoolStore;
