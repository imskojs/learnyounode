let http = require('http');
let urls = process.argv.slice(2);
//  Using callback
let results = [];
let count = 0;

urls.forEach((url, i) => {
  http.get(url, (res) => {
    let str = '';
    res.setEncoding('utf8');

    res.on('data', (data) => {
      str += data;
    });

    res.on('end', () => {
      ++count;
      results[i] = str;
      if (count === urls.length) {
        urls.forEach((url, i) => {
          console.log(results[i]);
        });
      }
    });

  }).on('error', (err) => {
    console.error(err);
  });
});




let http = require('http');
let urls = process.argv.slice(2);
//  Using Promise
let promises = urls.map((url) => {
  return new Promise(function(resolve){
    http.get(url, (res) => {
      let str = '';
      res.setEncoding('utf8');
      res.on('data', (data) => {
        str += data;
      });

      res.on('end', () => {
        resolve(str);
      });
    });
  });
});

Promise.all(promises)
  .then((array) => {
    array.forEach(function(val){
      console.log(val);
    });
  });
