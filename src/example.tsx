import schoolStore from './stores/school';

export const App = () => {
	const school = schoolStore.get();
	return (
		<Stuff>
			<span>{school.name}</span>
		</Stuff>
	);
};