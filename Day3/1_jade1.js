const express = require('express');
const fs = require('fs');
const jade = require('jade');

const app = express();
const router = express.Router();

router.route('/about').post((req, res) => {
    fs.readFile('./jade1.jade', 'utf-8', (err, data) => {
        if(err){
            console.log(err);
        }else{
            const jd = jade.compile(data);
            res.writeHead(200, {'content-type':'text/html'});
            res.end(jd());
        }
    });
});

app.use('/', router);

app.all('*', (req, res) => {
    res.status(404).send('<h2>페이지를 찾을 수 없습니다</h2>');
});

app.listen(3000, () => {
    console.log('3000번 포트로 서버 실행중 !!!...');
});
