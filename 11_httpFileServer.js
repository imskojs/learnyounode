const http = require('http');
const fs = require('fs');

const port = +process.argv[2];
const filePath = process.argv[3];

const server = http.createServer((request, response) => {
  const srcStream = fs.createReadStream(filePath);
  srcStream.pipe(response);
  // .on('end', function() {
  //   response.end();
  // });
});

server.listen(port);




