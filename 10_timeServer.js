// TCP works in the Transport layer while HTTP works in Application layer of 
//TCP/IP model. This just means that HTTP works on top of TCP. 
// TCP is in charge of setting up a reliable connection between two machines 
//and HTTP uses this connection to transfer data between the server and the client. 
// HTTP is used for transferring data while TCP is in charge of setting up a connection 
//which should be used by HTTP in the communication process. 
// Without TCP, HTTP cannot function (to be crisp).
const net = require('net');

const server = net.createServer((socket) => {
  const date = new Date();
  const result = formatTime(date);
  socket.write(result);
  return socket.end();
});

server.listen(+process.argv[2]);

//====================================================
//  Helper
//====================================================
function formatTime(date) {
  const year = zeroFill(date.getFullYear());
  const month = zeroFill(date.getMonth() + 1);
  const day = zeroFill(date.getDate());
  const hour = zeroFill(date.getHours());
  const minute = zeroFill(date.getMinutes());

  const result = `${year}-${month}-${day} ${hour}:${minute}
`;

  return result;
}

function zeroFill(num) {
  return (num < 10 ? '0' : '') + num;
  // // Above is the same as below
  // if(num < 10){
  //   return '0' + num;
  // } else {
  //   return '' + num;
  // }
}
