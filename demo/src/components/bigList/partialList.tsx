import React from 'react';
import { contentStore } from '../../store/content';

export function PartialList() {
	console.log(`rendering "BottomSection -> PartialList"`);
	const content = contentStore.useGet((obj) => [
        obj.topSection.bigList[1],
        obj.topSection.bigList[3],
        obj.topSection.bigList[5],
    ]);

	return <ul className="big-list">
        {[1,2,3,4,5].map((num) => {
            return <li><button>{num}{content.topSection.bigList[num]}</button></li>
        })}
    </ul>;
};
