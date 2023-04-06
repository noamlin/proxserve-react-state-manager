import React from 'react';
import './card.scss';

import { CardContent } from './cardContent';

export const Card = () => {
	console.log('rendering "MiddleSection -> Card"');

	return (
		<div className="card"><CardContent /></div>
	);
};
