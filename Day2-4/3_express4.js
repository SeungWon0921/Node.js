const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res) => {
    const userid = req.body.userid;
    const userpw = req.body.userpw;

    console.log(`userid:${userid}, userpw:${userpw}`);

    res.writeHead(200, {'content-type':'text/html;charset=utf-8'});
    res.write('<h2>익스프레스 서버에서 응답한 메세지입니다</h2>');
    res.write(`<p>아이디 : ${userid}</p>`);
    res.write(`<p>비밀번호 : ${userpw}</p>`);
    res.end();
});

app.listen(3000, () => {
    console.log('3000번 포트로 서버 실행중 ...');
});