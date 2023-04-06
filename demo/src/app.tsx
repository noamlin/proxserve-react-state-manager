import React from 'react';
import './app.scss';

import { TopSection } from './sections/top';
import { MiddleSection } from './sections/middle';
import { BottomSection } from './sections/bottom';

export const App = () => {
	return (
		<div>
			<TopSection />
			<MiddleSection />
			<BottomSection />
		</div>
	);
};
