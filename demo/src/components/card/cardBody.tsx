import React from 'react';
import { contentStore } from '../../store/content';

export const CardBody = () => {
	console.log('rendering "MiddleSection -> Card -> CardContent -> CardBody"');
	const content = contentStore.useGet((obj) => obj.topSection.inputText);

	return (
		<div className="card-body">{content.topSection.inputText}</div>
	);
};
