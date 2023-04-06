# proxserve-react

> React bindings for Proxserve as a state manager

[![NPM](https://img.shields.io/npm/v/proxserve-react.svg)](https://www.npmjs.com/package/proxserve-react) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save proxserve-react
```

## Usage

```tsx
// my-store.ts
import PRSM from 'proxserve-react';
const myStore = new PRSM<StoreType>('store-name');
// optional - initialize once
myStore.init({ myText: 'example', myNumber: 5 });
export { myStore };
```

```tsx
import React from 'react'
import { myStore } from './my-store.ts'

function MyComponent() {
  // use my store and listen (re-render) on myNumber changes
  const my = myStore.useGet((obj) => [obj.myNumber]);
  return <p>{my.myText} {my.myNumber}</p>
}

export function App() {
  // optional - initialize on component render
  useEffect(() => {
    myStore.init(...);
  }, []);

  return <div><MyComponent /></div>
}
```

## License

proxserve-react is [APACHE-2.0 licensed](https://www.apache.org/licenses/LICENSE-2.0).
