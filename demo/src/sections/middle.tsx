import React from 'react';
import { inputTextSelector, MSTitleSelector } from '../store/content';

import { BlueText } from '../components/blueText/blueText';
import { InputText } from '../components/inputText/inputText';
import { Card } from '../components/card/card';

export const MiddleSection = () => {
	console.log('rendering "MiddleSection"');
	const title = MSTitleSelector.useGet();
	const inputText = inputTextSelector.useGet();

	return (
		<div className="middle-section">
			<h1>{title}</h1>
			<BlueText />
			<br/><br/>
			<InputText parentName="MiddleSection" />
			<br/><br/>
			<Card />
			<br/><br/>
			Initialized input but not watching for changes:
			{' '}
			<input value={inputText} disabled />
		</div>
	);
};
