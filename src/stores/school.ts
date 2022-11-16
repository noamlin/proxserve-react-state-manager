import PRSM from '../index';

type SchoolState = {
    name: string;
    address: {
        city: string;
        street: string;
        zipcode: number;
    };
    students: Array<{ name: string; score: number; }>;
    teachers: Array<{ name: string; salary: number; }>;
};

export default new PRSM<SchoolState>('school');
const school: SchoolState = {
    name: 'PRSM Highschool',
    address: {
        city: 'Los Angeles',
        street: '7th boulevard',
        zipcode: 12345,
    },
    students: [
        {
            name: 'Noam Lin',
            score: 100,
        }
    ],
    teachers: [
        {
            name: 'John Doe',
            salary: 555,
        }
    ],
};