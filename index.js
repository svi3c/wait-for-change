var fs = require("fs");

var fileExists = file =>
  new Promise((resolve, reject) =>
    fs.access(file, err => err ? reject(err) : resolve(file)));

var waitForFileExists = file =>
  fileExists(file)
    .catch(() => new Promise(resolve => setTimeout(() => waitForFileExists(file), 100)));

var waitForChange = file =>
  new Promise(resolve => {
    var watcher = fs.watch(file, (event, filename) => {
      if(event === "change") {
        watcher.close();
        resolve(file);
      }
    });
  });

module.exports = (file) =>
  fileExists(file)
    .then(
      () => waitForChange(file),
      () => waitForFileExists(file)
    );
