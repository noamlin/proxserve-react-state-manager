import { PRSM } from '../../../';
import { loremIpsum } from '../loremIpsum';

type Content = {
    topSection: {
        title: string;
        body: string;
        inputText: string;
        bigList: string[];
    };
    middleSection: {
        title: string;
        body: string;
        card: {
            title: string;
        };
    };
    bottomSection: {
        title: string;
        body: string;
    };
};

const contentStore = new PRSM<Content>('content');

contentStore.init({
    topSection: {
        title: 'Top Section',
        body: loremIpsum[0],
        inputText: 'type here and see the magic',
        bigList: []
    },
    middleSection: {
        title: 'Middle Section',
        body: loremIpsum[1],
        card: {
            title: 'Card Title'
        }
    },
    bottomSection: {
        title: 'Bottom Section',
        body: loremIpsum[2]
    },
}, {trace: 'none'});

export {contentStore};
