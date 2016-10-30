// Test what url.parse does
// node -pe "require('url').parse('/test?q=1', true)" 
const http = require('http');
const url = require('url');


http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  // Note the second argument true to parse query property
  //to an Object.
  const urlObject = url.parse(req.url, true);
  const urlPath = urlObject.pathname;

  if (urlPath === '/api/parsetime') {
    const date = new Date(urlObject.query.iso);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const result = { hour, minute, second };
    return res.end(JSON.stringify(result));
  }

  if (urlPath === '/api/unixtime') {
    const date = urlObject.query.iso;
    const unixtime = new Date(date).getTime();
    return res.end(JSON.stringify({ unixtime }));
  }

}).listen(+process.argv[2]);
