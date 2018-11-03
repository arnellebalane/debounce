# debounce

Limit the rate at which a callback function is executed.


## Installation

Install via npm (or yarn):

```bash
npm install @arnellebalane/debounce
```

Or via CDN (unpkg.com):

```html
<script src="https://unpkg.com/@arnellebalane/debounce/dist/debounce.umd.js"></script>
```


## Usage

This package exposes a `debounce` function:

```js
import debounce from '@arnellebalane/debounce';

function someFunction() { /**/ }

const debounced = debounce(someFunction, 1000);
// Multiple calls to `debounced` that are less than 1000 milliseconds apart
// only get executed once. Everything that's passed to `debounced` is forwarded
// to `someFunction`.
```

This function is exposed as `window.debounce` when not using AMD or CommonJS.


## API

- **`debounce(callback, duration, options)`**:
  - Parameters:
    - `callback` (`Function`): The function that needs to be debounced/rate-limited.
    - `duration` (`Number`): The delay, in milliseconds, between successive calls.
      Calls that are less that this value apart from each other are treated as one.
    - `options` (`Object`, optional):
      - `immediate` (`Boolean`, default=`true`). Whether to execute the callback
        at the beginning of the first call or at the end of the last call.
  - Returns: `Function`. Everything that's passed to this returned function is
    forwarded to the given callback function.


## Contributing

Any form of contribution into this repository is welcome and greatly appreciated.

1. Fork this repository and clone your fork.
2. Apply your changes. Make sure to add tests for those changes.
3. Run tests: `npm test`.
4. File a Pull Request into this repository.


## License

MIT License
