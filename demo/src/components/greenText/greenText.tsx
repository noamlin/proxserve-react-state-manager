import React from 'react';
import { contentStore } from '../../store/content';
import './greenText.scss';

export const GreenText = () => {
	console.log('rendering "BottomSection -> GreenText"');
	const content = contentStore.useGet();

	return (
		<span className="green-text">{content.bottomSection.body}</span>
	);
};
