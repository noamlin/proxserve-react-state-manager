import React from 'react';
import { TSSelector, inputTextSelector } from '../store/content';

import { RedText } from '../components/redText/redText';
import { BigList } from '../components/bigList/bigList';

export const TopSection = () => {
	console.log('rendering "TopSection"');
	const inputText = inputTextSelector.useGet((state) => state);
	const topSection = TSSelector.useGet();

	return (
		<div className="top-section">
			<h1>{topSection.title}</h1>
			<RedText />
			<br/><br/>
			<input value={inputText} disabled />
			<br/><br/>
			<BigList />
		</div>
	);
};
