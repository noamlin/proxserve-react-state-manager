import React from 'react';
import { contentStore } from '../store/content';

import { RedText } from '../components/redText/redText';
import { BigList } from '../components/bigList/bigList';

export const TopSection = () => {
	console.log('rendering "TopSection"');
	const content = contentStore.useGet((obj) => obj.topSection.inputText);

	return (
		<div className="top-section">
			<h1>{content.topSection.title}</h1>
			<RedText />
			<br/><br/>
			<input value={content.topSection.inputText} disabled />
			<br/><br/>
			<BigList />
		</div>
	);
};
