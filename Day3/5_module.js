const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.engine('html', require('ejs').renderFile);  // views 디렉토리에서 ejs 파일을 찾음
app.use(bodyParser.urlencoded({extended: false}));

const module1 = require('./router/module1')(app, fs);

app.listen(3000, () => {
    console.log('3000번 포트로 서버 실행중 ...');
});

