// define generic function
// myModule(dirName, getExt, cb)  // (err, filteredFiles)
const fs = require('fs');
const path = require('path');

module.exports = (dirName, getExt, cb) => {
  return fs.readdir(dirName, (err, files) => {
    if (err) { return cb(err); }
    const filteredArray = files
      .filter((file) => {
        const ext = path.extname(file);  // .txt
        if('.' + getExt === ext){
          return true;
        }
      });
    return cb(null, filteredArray);
  });
};
