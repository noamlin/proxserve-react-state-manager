import React, { useCallback } from 'react';
import { contentStore } from '../../store/content';

export const Item = ({ itemNumber }: { itemNumber: number }) => {
	console.log(`rendering "TopSection -> BigList -> Item ${itemNumber}"`);
	const content = contentStore.useGet((obj) => obj.topSection.bigList[itemNumber]);

    if (!content.topSection.bigList[itemNumber]) {
        // initiate
        content.topSection.bigList[itemNumber] = 'a';
    }

    const onClick = useCallback(() => {
        const currentCode = content.topSection.bigList[itemNumber].charCodeAt(0);
        let nextCode = currentCode + 1;
        if (nextCode > 122) nextCode = 97;
		content.topSection.bigList[itemNumber] = String.fromCharCode(nextCode);
	}, []);

	return <li>
        <button onClick={onClick}>{itemNumber}{content.topSection.bigList[itemNumber]}</button>
    </li>;
};
