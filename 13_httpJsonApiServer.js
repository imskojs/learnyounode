// Test what url.parse does
// node -pe "require('url').parse('/test?q=1', true)" 
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
