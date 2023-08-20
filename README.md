# @keg-hub/jsutils
A utility library for commonly used helper methods. Similar to lodash, underscore, etc...
See docs at [https://keg-hub.github.io/jsutils](https://keg-hub.github.io/jsutils/)

## Add to your project
```js
  yarn add @keg-hub/jsutils
  npm install @keg-hub/jsutils
```

## Usage
```js
  // * Import into code
  import jsutils from '@keg-hub/jsutils'
  // Or only the methods you need
  import { capitalize } from '@keg-hub/jsutils/string'
  import { reduceObj, mapObj } from '@keg-hub/jsutils/object'

  // * Or require code
  const jsutils = require('@keg-hub/jsutils')

  // * Or add as html script
  <script src='/path/to/jsutils/build/jsutils.min.js'></script>

  // jsutils will be available on the window 
  <script>
    const jsutils = window.jsutils

  </script>
```
