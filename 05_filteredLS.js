// google fs.readdir
// google path
const fs = require('fs');
const path = require('path');
const filePath = process.argv[2];
const getExt = process.argv[3];
fs.readdir(filePath, (err, files) => {
  if(err){ return err; }
  return files
    .filter((file) => {
      const ext = path.extname(file);  // .txt
      if('.' + getExt === ext){
        return true;
      }
    })
    .forEach((filteredFile) => {
      return console.log(filteredFile);
    });
});

