import React, { ChangeEventHandler, useCallback } from 'react';
import { contentStore } from '../../store/content';
import './inputText.scss';

// input as another component so it will only trigger its own re-render
export const InputText = () => {
	console.log('rendering "MiddleSection -> InputText"');
	const content = contentStore.useGet((obj) => obj.topSection.inputText);

	const onChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
		content.topSection.inputText = event.target.value;
	}, []);

    const onClick = useCallback(() => {
		alert(`typing in the input should trigger the following re-renders:
        1. TopSection component and all of its children
        2. InputText component (no parent)
        3. CardBody component (no parents)
        4. BottomSection component and all of its children`);
	}, []);

	return (
        <>
            <input value={content.topSection.inputText} onChange={onChange} />
            {' '}
            <button className="input-i-button" onClick={onClick}>i</button>
        </>
    );
};