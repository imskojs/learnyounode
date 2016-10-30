// require external function
// function usage

const myModule = require('./06_makeItModularModule');
myModule(process.argv[2], process.argv[3], (err, files) => {
  if (err) { return err; }
  return files.forEach((file) => {
    return console.log(file);
  });
});
