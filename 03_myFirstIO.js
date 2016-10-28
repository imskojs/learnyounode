// require란 node에서 사용하는 library를 가지고 오는것입니다.
// node에는 여러가지 core library가 있습니다.
// require를 치게되면 node_modules라는 folder에서 찾아보고 없으면 그 위로 올라가 찾습니다.
// buf는 memory block(저장장치에)안에 들어있는 data라고 보시면 됩니다.
// 이 data는 저희가 알아 들을수 있는 data가 아닙니다. memory block을 그대로 가지고 온것이라고 보면 됩니다.
// 예) 
// googling fs.readFileSync
// buffer is a raw memory allocation


//====================================================
//  Answer
//====================================================
let fs = require('fs');
let firstArg = process.argv[2];
let buf = fs.readFileSync(firstArg);
let numberOfNewLines = buf.toString().split('\n').length - 1;
console.log(numberOfNewLines);



