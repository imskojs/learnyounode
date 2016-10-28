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

//====================================================
//  Helper
//====================================================
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
