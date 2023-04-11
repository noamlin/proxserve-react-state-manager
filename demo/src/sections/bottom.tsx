import React from 'react';
import { contentStore } from '../store/content';

import { InputText } from '../components/inputText/inputText';
import { GreenText } from '../components/greenText/greenText';
import { PartialList } from '../components/bigList/partialList';
import { GlobalCounter } from '../components/globalCounter/globalCounter';

export const BottomSection = () => {
	console.log('rendering "BottomSection"');
	const content = contentStore.useGet();

	return (
		<div className="bottom-section">
			<h1>{content.bottomSection.title}</h1>
			<GreenText />
			<br/><br/>
			<InputText parentName="BottomSection" />
			<br/><br/>
			<PartialList />
			<br/><br/>
			<GlobalCounter />
		</div>
	);
};
