//====================================================
//  Hello World
//====================================================
console.log('HELLO WORLD');


//====================================================
//  Baby Steps
//====================================================
// Node에서는 process라는 global variable(전역 변수)이 있습니다.
// argv stands for argument vector. 
// argv is a one-dimensional array of strings
// CLI에서 쓰는 것을 그대로 가지고 옵니다.
// 첫번째 item은 항상 'node'이고
// 두번째 item은 항상 여러분이 실행하는 program.js파일입니다.
// 그래서 3번째 index 부터가 저희가 알고있는 인자(argument)이지요.

//  Imperative Programming
var sum = 0;
for (let i = 2; i < process.argv.length; i++) {
  sum = sum + Number(process.argv[i]);
}

console.log(sum);

//  Functional Programming
process.argv.slice(2)
  .reduce((acc, cur) => {
    acc[0] = acc[0] + Number(cur);
    return acc;
  }, [0])
  .forEach(val => console.log(val));


//====================================================
//  My First IO
//====================================================
// require란 node에서 사용하는 library를 가지고 오는것입니다.
// node에는 여러가지 core library가 있습니다.
// require를 치게되면 node_modules라는 folder에서 찾아보고 없으면 그 위로 올라가 찾습니다.
// buf는 memory block(저장장치에)안에 들어있는 data라고 보시면 됩니다.
// 이 data는 저희가 알아 들을수 있는 data가 아닙니다. memory block을 그대로 가지고 온것이라고 보면 됩니다.
// 예) 
// googling fs.readFileSync
// buffer is a raw memory allocation
let fs = require('fs');
let firstArg = process.argv[2];
let buf = fs.readFileSync(firstArg);
let numberOfNewLines = buf.toString().split('\n').length - 1;
console.log(numberOfNewLines);


//====================================================
//  My FIrst Async IO
//====================================================
// googling fs.readFile
let fs = require('fs');

fs.readFile(process.argv[2], (err, buf) => {
  if(err){ return err; }
  var numNewLines = buf.toString().split('\n').length - 1;
  console.log(numNewLines);
});



//====================================================
//  Filtered LS
//====================================================
// google fs.readdir
// google path
const fs = require('fs');
const path = require('path');
const filePath = process.argv[2];
const getExt = process.argv[3];
fs.readdir(filePath, (err, files) => {
  if(err){ return err; }
  files
    .filter((file) => {
      const ext = path.extname(file);  // .txt
      if('.' + getExt === ext){
        return true;
      }
    })
    .forEach((filteredFile) => {
      console.log(filteredFile);
    });
});


//====================================================
//  Make It Modular
//====================================================
// require external function
// function usage
var myModule = require('./06_makeItModularModule');
myModule(process.argv[2], process.argv[3], function(err, files) {
  if (err) { return err; }
  files.forEach((file) => {
    console.log(file);
  });
});


//====================================================
//  Make It Modular Module
//====================================================
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


//====================================================
//  HTTP Client
//====================================================
// google http.get
// response stream === EventEmitter
// on 'data'
// on 'error' non idiomatic node function
const http = require('http');
const URL = process.argv[2];
http.get(URL, function(response) {
  response.on('data', (data) => {
    console.log(data.toString());
  });
}).on('error', (err) => {
  console.error(err);
});


//====================================================
//  HTTP Collect
//====================================================
//  Native method
let http = require('http');
http.get(process.argv[2], (res) => {
  // res.setEncoding('utf8');
  var str = '';
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
let http = require('http');
let bl = require('bl');

http.get(process.argv[2], (res) => {
  // res#setEncoding does not work with pipe. It only converts
  //data in "data" event.
  res.pipe(bl((err, data) => {
    let str = data.toString('utf8');
    console.log(str.length);
    console.log(str);
  }));
}).on('error', (err) => {
  console.error(err);
});


//====================================================
//  Juggling Async
//====================================================
//  Using callback
let http = require('http');
let urls = process.argv.slice(2);
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

//  Using Promise
let http = require('http');
let urls = process.argv.slice(2);
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


//====================================================
//  Time Server
//====================================================
// TCP works in the Transport layer while HTTP works in Application layer of 
//TCP/IP model. This just means that HTTP works on top of TCP. 
// TCP is in charge of setting up a reliable connection between two machines 
//and HTTP uses this connection to transfer data between the server and the client. 
// HTTP is used for transferring data while TCP is in charge of setting up a connection 
//which should be used by HTTP in the communication process. 
// Without TCP, HTTP cannot function (to be crisp).
let net = require('net');

let server = net.createServer((socket) => {
  let date = new Date();
  let result = formatTime(date);
  socket.write(result);
  socket.end();

});

server.listen(+process.argv[2]);

function formatTime(date) {
  let year = zeroFill(date.getFullYear());
  let month = zeroFill(date.getMonth() + 1);
  let day = zeroFill(date.getDate());
  let hour = zeroFill(date.getHours());
  let minute = zeroFill(date.getMinutes());

  let result = `${year}-${month}-${day} ${hour}:${minute}
`;

  return result;
}

function zeroFill(i) {
  return (i < 10 ? '0' : '') + i;
}


//====================================================
//  HTTP File Server
//====================================================
let http = require('http');
let fs = require('fs');

let port = +process.argv[2];
let filePath = process.argv[3];

let server = http.createServer(function(request, response){
  let srcStream = fs.createReadStream(filePath);
  srcStream.pipe(response);
  // .on('end', function() {
  //   response.end();
  // });
});

server.listen(port);


//====================================================
//  HTTP Uppercaserer
//====================================================
let http = require('http');
let Transform = require('stream').Transform;
let uppercase = new Transform({
  transform(chunk, encoding, done) {
    chunk = chunk.toString();
    done(null, chunk.toUpperCase());
  }
});
http.createServer((req, res) => {
  if (req.method !== 'POST') {
    return res.end('not POST');
  }
  console.log("req :::\n", req);
  return req.pipe(uppercase).pipe(res);
    // .on('end', () => {
    //   return res.end();
    // });
}).listen(+process.argv[2]);


//====================================================
//  HTTP JSON api server
//====================================================
// Test what url.parse does
let http = require('http');
let url = require('url');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  // Note the second argument true to parse query property
  //to an Object.
  let urlObject = url.parse(req.url, true);
  let urlPath = urlObject.pathname;

  if (urlPath === '/api/parsetime') {
    let date = new Date(urlObject.query.iso);
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    let result = { hour, minute, second };
    return res.end(JSON.stringify(result));
  }

  if (urlPath === '/api/unixtime') {
    let date = urlObject.query.iso;
    let unixtime = new Date(date).getTime();
    return res.end(JSON.stringify({ unixtime }));
  }

}).listen(+process.argv[2]);







