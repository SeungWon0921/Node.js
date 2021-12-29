const fs = require('fs');
const data = "Hello World!";

fs.writeFile('text2.txt', data, 'utf-8', (err) => {
    if(err){
        console.log(err);
    }else{
        console.log('비동기식으로 파일저장!');
    }
});

fs.writeFileSync('text3.txt', data, 'utf-8');
console.log('동기식으로 파일저장!');