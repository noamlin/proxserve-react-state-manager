import React, { useMemo } from 'react';
import './bigList.scss';

import { Item } from './item';

export const BigList = () => {
	console.log('rendering "TopSection -> BigList"');

	const items = useMemo<JSX.Element[]>(() => {
		const itemsArr = [];
		for (let i=1; i <= 40; i++) {
			itemsArr.push(<Item key={i} itemNumber={i} />);
		}
		return itemsArr;
	}, []);

	return (
		<ul className="big-list">{items}</ul>
	);
};
