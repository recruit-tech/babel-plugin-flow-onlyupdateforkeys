# babel-plugin-flow-onlyupdateforkeys

A babel plugin to generate args of `recompose.onlyUpdateForKeys` from flow type.
It is intended to be an alternative to `recompose.onlyUpdateForPropTypes` for flow type.

## Example

**In**

```js
// @flow
import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';

export default compose(
  onlyUpdateForKeys(), // without args
)(function Foo(props: { foo: string, bar: number }) {
  const { foo, bar } = props;

  return (
    <div>{foo}-{bar}</div>
  );
});
```

**Out**

```js
// @flow
import React from 'react';
import { compose, onlyUpdateForKeys } from 'recompose';

export default compose(
  onlyUpdateForKeys(['foo', 'bar']), // with args
)(function Foo(props: { foo: string, bar: number }) {
  const { foo, bar } = props;

  return (
    <div>{foo}-{bar}</div>
  );
});
```

## Installation

```sh
$ npm install --save-dev babel-plugin-flow-onlyupdateforkeys
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["flow-onlyupdateforkeys"]
}
```

### Via CLI

```sh
$ babel --plugins flow-onlyupdateforkeys script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["flow-onlyupdateforkeys"]
});
```
