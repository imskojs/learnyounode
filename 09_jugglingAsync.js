//====================================================
//  Using Native Promise
//====================================================
const http = require('http');
const urls = process.argv.slice(2);
//  Using Promise
const promises = urls.map((url) => {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let str = '';
      res.setEncoding('utf8');
      res.on('data', (data) => {
        str += data;
      });

      res.on('end', () => {
        resolve(str);
      });
    }).on('error', () => {
      reject();
    });
  });
});

Promise.all(promises)
  .then((array) => {
    array.forEach((val) => {
      console.log(val);
    });
  });


//====================================================
//  Old School
//====================================================
// const http = require('http');
// const urls = process.argv.slice(2);
// //  Using callback
// const results = [];
// let count = 0;

// urls.forEach((url, i) => {
//   http.get(url, (res) => {
//     let str = '';
//     res.setEncoding('utf8');

//     res.on('data', (data) => {
//       str += data;
//     });

//     res.on('end', () => {
//       ++count;
//       results[i] = str;
//       if (count === urls.length) {
//         urls.forEach((url, i) => {
//           console.log(results[i]);
//         });
//       }
//     });

//   }).on('error', (err) => {
//     console.error(err);
//   });
// });
