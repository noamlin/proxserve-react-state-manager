import React, { useCallback } from 'react';
import './redText.scss';

import { loremIpsum } from '../../loremIpsum';
import { contentStore } from '../../store/content';

export const RedText = () => {
	console.log('rendering "TopSection -> RedText"');
	const content = contentStore.useGet();

	const onClick = useCallback(() => {
		const randomIndex = Math.floor(Math.random() * (loremIpsum.length - 1));
		content.middleSection.body = loremIpsum[randomIndex];
	}, []);

	return (
		<>
			<span className="red-text">{content.topSection.body}</span>
			<br/>
			<button onClick={onClick}>random text for blue</button>
		</>
	);
};
