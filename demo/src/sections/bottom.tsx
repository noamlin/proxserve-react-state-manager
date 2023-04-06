import React, { ChangeEventHandler, useCallback } from 'react';
import { contentStore } from '../store/content';

import { GreenText } from '../components/greenText/greenText';

export const BottomSection = () => {
	console.log('rendering "BottomSection"');
	const content = contentStore.useGet((obj) => obj.topSection.inputText);

	const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
		content.topSection.inputText = event.target.value;
	}, []);

	return (
		<div className="bottom-section">
			<h1>{content.bottomSection.title}</h1>
			<GreenText />
			<br/><br/>
			<input value={content.topSection.inputText} onChange={onChange} />
		</div>
	);
};
