#!/usr/bin/env node
var waitForChange = require(".");

waitForChange(process.argv.slice(2))
  .then(() => process.exit(0));
