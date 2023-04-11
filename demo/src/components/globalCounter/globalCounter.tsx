import React, { useRef } from 'react';
import { contentStore } from '../../store/content';

export const GlobalCounter = () => {
	console.log('rendering "BottomSection -> GlobalCounter"');
	const content = contentStore.useGet((obj) => [
		obj.topSection.bigList,
		obj.middleSection,
	], { deep: true });

	const counter = useRef(0);
	counter.current++;

	return <p>deep listening to any bigList or middleSection changes: {counter.current}</p>;
};
