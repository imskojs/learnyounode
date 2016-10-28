// require external function
// function usage

var myModule = require('./06_makeItModularModule');
myModule(process.argv[2], process.argv[3], function(err, files) {
  if (err) { return err; }
  files.forEach((file) => {
    console.log(file);
  });
});
