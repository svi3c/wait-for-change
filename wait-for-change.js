#!/usr/bin/env node
var waitForChange = require(".");

// Check if an interval was provided, and take it if possible.
var files = process.argv.slice(2);
var interval;
if (files.length > 1) {
  var lastElement = files[files.length - 1];
  if (/^\d+$/.test(lastElement)) { // Just to make sure the conversion would not fail
    files.pop();
    interval = Number(lastElement);
  }
}

waitForChange(files, interval)
  .then(() => process.exit(0));
