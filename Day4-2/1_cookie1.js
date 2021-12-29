const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());    // 일반 쿠키를 익스프레스 미들웨어로 등록

app.get('/setcookie', (req, res) => {
    console.log('setcookie 호출');
    res.cookie('member', {
        id:'banana',
        name:'반하나',
        gender:'여자'
    }, {
        maxAge: 1000 * 60 * 3
    });
    res.redirect('/showcookie'); 
});

app.get('/showcookie', (req, res) => {
    console.log('showcookie 호출');
    res.send(req.cookies);
    res.end();
});

app.listen(3000, () => {
    console.log('3000번 포트로 서버 실행중 ...');
});
