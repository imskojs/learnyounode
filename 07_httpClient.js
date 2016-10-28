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





  // res#setEncoding('ENCODING') makes data event to emit
  //strings rather than buffer
  // If this is not used we need to data.toString() it in
  //data event.


  // note callback is not idiomatic node function.
  //In order to handle error we listen 'error' event
