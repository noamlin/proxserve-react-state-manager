import React from 'react';
import { MSCardTitleSelector } from '../../store/content';

import { CardBody } from './cardBody';

export const CardContent = () => {
	console.log('rendering "MiddleSection -> Card -> CardContent"');
	const title = MSCardTitleSelector.useGet();

	return (
		<div className="card-content">
			<h2>{title}</h2>
			<CardBody />
		</div>
	);
};
