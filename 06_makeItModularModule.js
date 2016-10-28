// define generic function
// myModule(dirName, getExt, cb)  // (err, filteredFiles)
let fs = require('fs');
let path = require('path');

module.exports = (dirName, getExt, cb) => {
  fs.readdir(dirName, function(err, files) {
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
