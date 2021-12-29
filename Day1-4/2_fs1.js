const fs = require('fs');

// 비동기식으로 읽음
fs.readFile('./text1.txt', 'utf-8', (err, data) => {
    if(err){
        console.log(err);
    }else{
        console.log(`비동기식으로 읽음 : ${data}`);
    }
});

// 동기식으로 읽음
const text = fs.readFileSync('text1.txt', 'utf-8');
console.log(`동기식으로 읽음 : ${text}`);

