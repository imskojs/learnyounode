// googling fs.readFile
const fs = require('fs');

fs.readFile(process.argv[2], (err, buf) => {
  if(err){ return err; }
  const numNewLines = buf.toString().split('\n').length - 1;
  return console.log(numNewLines);
});
