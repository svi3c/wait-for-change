var fs = require("fs");

module.exports = (file, interval) => {
  interval = interval || 100;
  return new Promise(resolve => {
    var oldStats;
    var fileExists = true;
    var checkFile = () => fs.stat(file, (err, stats) => {
      if(err) {
        fileExists = false;
      } else {
        if(fileExists) {
          if(oldStats && (oldStats.ctime.getTime() !== stats.ctime.getTime() || oldStats.mtime.getTime() !== stats.mtime.getTime())) {
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
};
