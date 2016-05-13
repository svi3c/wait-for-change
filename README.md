# wait-for-change

This npm module can be used to wait for either a file being created or changed.

# Usage

```bash
npm install --save wait-for-change
```

### CLI

```bash
wait-for-change my/file && do-something-with my/file
```

### API

```javascript
var waitForChange = require("wait-for-change");

waitForChange("my/file").then(doSomethingWithMyFile);
```
