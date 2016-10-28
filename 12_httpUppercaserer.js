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
