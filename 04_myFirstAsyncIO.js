// googling fs.readFile
let fs = require('fs');

fs.readFile(process.argv[2], (err, buf) => {
  if(err){ return err; }
  var numNewLines = buf.toString().split('\n').length - 1;
  console.log(numNewLines);
});
