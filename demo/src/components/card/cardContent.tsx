import React from 'react';
import { contentStore } from '../../store/content';

import { CardBody } from './cardBody';

export const CardContent = () => {
	console.log('rendering "MiddleSection -> Card -> CardContent"');
	const content = contentStore.useGet();

	return (
		<div className="card-content">
			<h2>{content.middleSection.card.title}</h2>
			<CardBody />
		</div>
	);
};
