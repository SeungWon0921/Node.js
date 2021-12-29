const express = require('express');
const app = express();

app.use((req, res) => {
    console.log('첫번째 미들웨어 실행');

    console.dir(req.header);
    const userAgent = req.header('User-Agent');
    console.log(userAgent);

    // http://127.0.0.1:3000/?userid=apple

    res.writeHead(200, {'content-type':'text/html;charset=utf-8'});
    res.write('<h2>익스프레스 서버에서 응답한 메세지입니다.</h2>');
    res.write(`<p>user-agent : ${userAgent}</p>`);

    const userid = req.query.userid;

    res.write(`<p>아이디 : ${userid}</p>`);
    res.end();
});

app.listen(3000, () => {
    console.log('3000번 포트로 서버 실행중 ...');
});