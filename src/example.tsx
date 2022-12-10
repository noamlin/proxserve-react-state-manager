import schoolStore from './stores/school';
import type { SchoolState } from './stores/school';

export const App = () => {
	const schoolInitialState: SchoolState = {
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
	schoolStore.init(schoolInitialState);
	const school = schoolStore.useGet();

	return (
		<div>
			<span>{school.name}</span>
		</div>
	);
};