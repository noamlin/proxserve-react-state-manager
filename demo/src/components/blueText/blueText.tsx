import React from 'react';
import { contentStore } from '../../store/content';
import './blueText.scss';

export const BlueText = () => {
	console.log('rendering "MiddleSection -> BlueText"');
	const content = contentStore.useGet((obj) => obj.middleSection.body);

	return (
		<span className="blue-text">{content.middleSection.body}</span>
	);
};
