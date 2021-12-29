const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));

// http://127.0.0.1:3000/member/login (post)
router.route('/member/login').post((req, res) => {
    console.log('/member/login 호출!');
});

// http://127.0.0.1:3000/member/regist (post)
router.route('/member/regist').post((req, res) => {
    console.log('/member/regist 호출!');
});

// http://127.0.0.1:3000/about/detail (get)
router.route('/about/detail').get((req, res) => {
    console.log('/about/detail 호출!');
});

app.use('/', router);

app.all('*', (req, res) => {
    res.status(404).send('<h2>페이지를 찾을 수 없습니다.</h2>');
});

app.listen(3000, () => {
    console.log('3000 포트로 서버 실행중 ...');
});