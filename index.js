var fs = require("fs");

var waitForSingleFileChange = (file, interval) =>
  new Promise(resolve => {
    var oldStats;
    var fileExists = true;
    var checkFile  = () => fs.stat(file, (err, stats) => {
      if (err) {
        fileExists = false;
      } else {
        if (fileExists) {
          if (oldStats && (oldStats.ctime.getTime() !== stats.ctime.getTime() || oldStats.mtime.getTime() !== stats.mtime.getTime())) {
            resolve(file);
          }
          oldStats = stats;
        } else {
          resolve(file);
        }
      }
    });
    setInterval(checkFile, interval);
    checkFile();
  });

module.exports = (files, interval) => {
  if (typeof files === "string") {
    files = [files];
  }
  interval = interval || 100;
  return Promise.all(files.map(file => waitForSingleFileChange(file, interval)));
};