// Node에서는 process라는 global variable(전역 변수)이 있습니다.
// argv stands for argument vector. 
// argv is a one-dimensional array of strings
// CLI에서 쓰는 것을 그대로 가지고 옵니다.
// 첫번째 item은 항상 'node'이고
// 두번째 item은 항상 여러분이 실행하는 program.js파일입니다.
// 그래서 3번째 index 부터가 저희가 알고있는 인자(argument)이지요.

//====================================================
//  Functional Programming
//====================================================
process.argv.slice(2)
  .reduce((acc, cur) => {
    acc[0] = acc[0] + Number(cur);
    return acc;
  }, [0])
  .forEach(val => console.log(val));


//====================================================
//  Imperative Programming
//====================================================
// let sum = 0;
// for (let i = 2; i < process.argv.length; i++) {
//   sum = sum + Number(process.argv[i]);
// }

// console.log(sum);
