const http = require('http');
const Transform = require('stream').Transform;
const uppercase = new Transform({
  transform(chunk, encoding, done) {
    chunk = chunk.toString();
    done(null, chunk.toUpperCase());
  }
});
http.createServer((req, res) => {
  if (req.method !== 'POST') {
    return res.end('NOT_POST');
  }
  return req.pipe(uppercase).pipe(res);
    // .on('end', () => {
    //   return res.end();
    // });
}).listen(+process.argv[2]);
