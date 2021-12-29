const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));

// http://127.0.0.1:3000/mail
router.route('/mail').get((req, res) => {
    fs.readFile('mail.html', 'utf-8', (err, data) => {
        if(err){
            console.log(err);
        }else{
            res.writeHead(200, {'content-type':'text/html'});
            res.end(data);
        }
    });
});

router.route('/mail').post((req, res) => {
    const userid    = req.body.userid;
    const sendmail  = req.body.sendmail;
    const touserid  = req.body.touserid;
    const tomail    = req.body.tomail;
    const title     = req.body.title;
    const content   = req.body.content;

    const fmtfrom = `${userid}<${sendmail}>`; // Ryuzy<ryuzy1011@gmail.com>
    const fmtto = `${touserid}<${tomail}>`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ryuzy1011@gmail.com',
            pass: '1111'
        },
        host: 'smtp.mail.com',
        port: '465'
    });

    const mailOption = {
        from: fmtfrom,
        to: fmtto,
        subject: title,
        text: content
    };

    transporter.sendMail(mailOption, (err, info) => {
        if(err){
            console.log(err);
        }else{
            console.log(info);
        }
        transporter.close();
    });
});

app.use('/', router);

app.all('*', (req, res) => {
    res.status(404).send('<h2>페이지를 찾을 수 없습니다</h2>');
});

app.listen(3000, () => {
    console.log('3000번 포트로 서버 실행중 !!!...');
});
