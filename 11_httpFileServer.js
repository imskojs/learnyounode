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




