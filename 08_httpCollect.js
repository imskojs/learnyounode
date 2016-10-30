//  Native method
const http = require('http');
http.get(process.argv[2], (res) => {
  // res.setEncoding('utf8');
  let str = '';
  res.on('data', (data) => {
    str += data;
  });
  res.on('end', () => {
    console.log(str.length);
    console.log(str);
  });
}).on('error', (err) => {
  console.error(err);
});


//  Using bl (Buffer List)
// const http = require('http');
// const bl = require('bl');

// http.get(process.argv[2], (res) => {
//   // res#setEncoding does not work with pipe. It only converts
//   //data in "data" event.
//   return res.pipe(bl((err, data) => {
//     let str = data.toString('utf8');
//     console.log(str.length);
//     console.log(str);
//   }));
// }).on('error', (err) => {
//   console.error(err);
// });
