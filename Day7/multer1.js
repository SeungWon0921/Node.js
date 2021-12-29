const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const static = require('serve-static');
const logger = require('morgan');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname,'uploads')));
app.use(logger('dev'));

const storage = multer.diskStorage({
    destination: (req, file, callback) =>{
        callback(null, 'uploads')
    },
    filename: (req, file, callback)=>{
        const extension = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extension);
        callback(null, basename + "_" + Date.now()+extension);
    }
});

const upload = multer({
    storage: storage,
    limit: { 
        file: 1,
        fileSize: 1024 * 1024 * 100
    }
});

router.route('/write').post(upload.array('photo',1),(req,res)=>{
    try {
        const files = req.files;
        console.dir(req.files[0]);

        let originalname = '';
        let filename = '';
        let mimetype = '';
        let size = 0;

        if(Array.isArray(files)){
            console.log(`클라이언트에서 받아온 파일 개수 : ${files.length}`);
            for(let i = 0; i<files.length; i++){
                originalname = files[i].originalname;
                filename = files[i].filename;
                mimetype = filse[i].mimetype;
                size = files[i].size;
            }
        }
        console.log(e);
        const title = req.body.title;

        res.writeHead('200', {'Content-type':'text/html;charset=utf-8'});
        res.write(`<h2>이미지 업로드 성공</h2>`);
        res.write(`<hr/>`);
        res.write(`<p>제목 : ${title}</p>`);
        res.write(`<p>원본파일명 : ${originalname}</p>`);
        res.write(`<p>현재파일명 : ${filename}</p>`);
        res.write(`<p>MimeType : ${mimetype}</p>`);
        res.write(`<p>파일크기 : ${size}</p>`);
        res.write(`<p><img src='/uploads/${filename} width=200></p>`);
        res.end();
    }catch(e){
        console.log(e);
    }
})


//router.route('/write').post()
app.use('/',router);


app.listen(3000, () => {
    console.log('3000번 포트로 서버 실행중 ...');
});