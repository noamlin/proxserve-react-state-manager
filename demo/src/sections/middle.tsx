import React from 'react';
import { contentStore } from '../store/content';

import { BlueText } from '../components/blueText/blueText';
import { InputText } from '../components/inputText/inputText';
import { Card } from '../components/card/card';

export const MiddleSection = () => {
	console.log('rendering "MiddleSection"');
	const content = contentStore.useGet((obj) => obj.middleSection.title);

	return (
		<div className="middle-section">
			<h1>{content.middleSection.title}</h1>
			<BlueText />
			<br/><br/>
			<InputText />
			<br/><br/>
			<Card />
			<br/><br/>
			Initialized input but not watching for changes:
			{' '}
			<input value={content.topSection.inputText} disabled />
		</div>
	);
};
