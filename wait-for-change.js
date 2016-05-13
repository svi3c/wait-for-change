#!/usr/bin/env node
var waitForChange = require(".");

waitForChange(process.argv[2])
  .then(() => process.exit(0));
