import React from 'react';
import { inputTextSelector } from '../../store/content';

export const CardBody = () => {
	console.log('rendering "MiddleSection -> Card -> CardContent -> CardBody"');
	const inputText = inputTextSelector.useGet((state) => state);

	return (
		<div className="card-body">{inputText}</div>
	);
};
