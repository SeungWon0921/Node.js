const fs = require('fs');

// 동기식으로 읽음
let text = null;
try{
    text = fs.readFileSync('text1.txt', 'utf-8');
}catch(e){
    console.log(`동기식으로 파일읽기 실패!`);
}
console.log(`동기식으로 읽음 : ${text}`);