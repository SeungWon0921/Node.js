const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const router = express.Router();

let database;

app.use(bodyParser.urlencoded({extended:false}));

router.route('/member/regist').post((req,res)=>{
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.name;
    const gender = req.body.gender;

    console.log(`userid:${userid}, userpw:${userpw}, name:${name},gender:${gender}`);

    if(database){
        joinMember(userid, userpw, name, gender, (err, result) => {
            if(err){
                res.writeHead('200', {'content-type':'text/html;'});
                res.write('<h2>회원가입 실패</h2>');
                res.write('<p>오류가 발생했습니다</p>');
                res.end();
            }else{
                if(result.insertedCount > 0){
                    res.writeHead('200', {'content-type':'text/html;'});
                    res.write('<h2>회원가입 성공</h2>');
                    res.write('<p>가입이 성공적으로 완료되었습니다</p>');
                    res.end();
                }else{
                    res.writeHead('200', {'content-type':'text/html;'});
                    res.write('<h2>회원가입 실패</h2>');
                    res.write('<p>회원가입에 실패하였습니다</p>');
                    res.end();
                }
            }
        });
    }else{
            res.writeHead('200', {'content-type':'text/html;'});
            res.write('<h2>데이터베이스 연결 실패</h2>');
            res.write('<p>mongodb 데이터베이스 연결 실패!</p>');
            res.end();
        }
    });

    //로그인
    //http://127.0.0.1:3000/member/login (post)
router.route('/member/login').post((req,res)=>{
    const userid=req.body.userid;
    const userpw=req.body.userpw;

    console.log(`userid:${userid},userpw:${userpw}`);

    if(database){
        loginMember(userid, userpw,(err, result) => {
            if(err){
                res.writeHead('200', {'content-type':'text/html;'});
                res.write('<h2>로그인 실패</h2>');
                res.write('<p>오류가 발생했습니다</p>');
                res.end();
            }else{
                if(result){
                    res.writeHead('200', {'content-type':'text/html;'});
                    res.write('<h2>로그인 성공</h2>');
                    res.write(`<p>아이디 : ${result[0].userid}</p>`);
                    res.write(`<p>비밀번호 : ${result[0].userpw}</p>`);
                    res.write(`<p>이름 : ${result[0].name}</p>`);
                    res.write(`<p>성별 : ${result[0].gender}</p>`);
                    res.end();
                }else{
                    res.writeHead('200', {'content-type':'text/html;'});
                    res.write('<h2>로그인 실패</h2>');
                    res.write('<p>아이디 또는 비밀번호를 확인하세요</p>');
                    res.end();
                }
            }
        });
    }else{
            res.writeHead('200', {'content-type':'text/html;'});
            res.write('<h2>데이터베이스 연결 실패</h2>');
            res.write('<p>mongodb 데이터베이스 연결 실패!</p>');
            res.end();
        }
});

//정보수정
//http://127.0.0.1:3000/member/edit (put)
router.route('/member/edit').put((req,res)=>{
    const userid = req.body.userid;
    const userpw = req.body.userpw;
    const name = req.body.name;
    const gender = req.body.gender;

    console.log(`userid:${userid}, userpw:${userpw}, name:${name},gender:${gender}`);

    if(database){
        editMember(userid, userpw, name, gender, (err, result) => {
            if(err){
                res.writeHead('200', {'content-type':'text/html;'});
                res.write('<h2>회원정보 수정 실패</h2>');
                res.write('<p>오류가 발생했습니다</p>');
                res.end();
            }else{
                if(result.modifiedCount >0){
                    res.writeHead('200', {'content-type':'text/html;'});
                res.write('<h2>회원정보 수정 성공</h2>');
                res.write('<p>정보 수정 성공했습니다</p>');
                res.end();
                }else{
                    res.writeHead('200', {'content-type':'text/html;'});
                res.write('<h2>회원정보 수정 실패</h2>');
                res.write('<p>정보 수정 실패했습니다</p>');
                res.end();
                }
            }
        });
    }else{
            res.writeHead('200', {'content-type':'text/html;'});
            res.write('<h2>데이터베이스 연결 실패</h2>');
            res.write('<p>mongodb 데이터베이스 연결 실패!</p>');
            res.end();
        }
});

// 회원 삭제
// http://127.0.0.1:3000/member/delete (delete)
router.route('/member/delete').delete((req, res) => {
    const userid = req.body.userid;

    console.log(`userid:${userid}`);
    
    if(database){
        deleteMember(userid, (err, result) => {
            if(err){
                res.writeHead('200', {'content-type':'text/html;'});
                res.write('<h2>회원정보 삭제 실패</h2>');
                res.write('<p>오류가 발생했습니다</p>');
                res.end();}else{
                    if(result.deletedCount > 0){
                        res.writeHead('200', {'content-type':'text/html;'});
                        res.write('<h2>회원정보 삭제 성공</h2>');
                        res.write('<p>정보 삭제 성공했습니다</p>');
                        res.end();
                    }else{
                        res.writeHead('200', {'content-type':'text/html;'});
                        res.write('<h2>회원정보 삭제 실패</h2>');
                        res.write('<p>정보 삭제 실패했습니다</p>');
                        res.end();
                    }
                }
            });
        }else{
            res.writeHead('200', {'content-type':'text/html;'});
            res.write('<h2>데이터베이스 연결 실패</h2>');
            res.write('<p>mongodb 데이터베이스 연결 실패!</p>');
            res.end();
        }
    });
const joinMember = function(userid,userpw,name,gender, callback){
    const members = database.collection('member');
    members.insertMany([{userid:userid, userpw:userpw, name:name, gender:gender}],(err, result) =>{
        if(err){
            console.log(err);
            callback(err, null);
            return;
        }else{
            if(result.insertedCount > 0){
                console.log(`사용자 document ${result.insertedCount}명이 추가되었습니다`);
            }else{
                console.log('사용자 document 추가되지 않았습니다');
            }
            callback(null,result);
        }
    })
}

const loginMember = function(userid,userpw, callback){
    const members = database.collection('member');

    members.find({userid:userid, userpw:userpw}).toArray((err,result)=>{
        if(err){
            console.log(err);
            callback(err, null);
            return;
        }else{
            if(result.length > 0){
                console.log('사용자를 찾았습니다');
                callback(null,result);
            }else{
                console.log('일치하는 사용자가 없습니다');
                callback(null, null);
            }
        }
    });
}

const deleteMember = function(userid, callback){
    const members = database.collection('member');

    members.deleteOne({userid:userid}, (err, result) => {
        if(err){
            console.log(err);
            callback(err, null);
            return;
        }else{
            if(result.deletedCount > 0){
                console.log(`사용자 document ${result.deletedCount}명 삭제되었습니다`);
            }else{
                console.log('삭제된 사용자가 없습니다');
            }
            callback(null, result);
        }
    });
}

const editMember = function(userid, userpw, name, gender, callback){
    const members = database.collection('member');
    members.updateOne({userid:userid}, {$set:{userid:userid, userpw:userpw, name:name, gender:gender}},(err,result)=>{
        if(err){
            console.log(err);
            callback(err, null);
            return;
        }else{
            if(result.modifiedCount > 0){
                console.log(`사용자 document ${result.modifiedCount}명 수정되었습니다`);
            }else{
                console.log(`수정된 document가 없습니다`);
            }
            callback(null,result);
        }
    });
}

app.use('/',router);

function connectDB() {
    const databaseURL = "mongodb://127.0.0.1:27017";
    MongoClient.connect(databaseURL, { useUnifiedTopology: true}, (err, db)=>{
        if(err){
            console.log(err);
        }else{
            const dbtemp = db.db('forntend');
            database = dbtemp;
            console.log('mongodb 데이터베이스 연결 성공!');
        }
    });
}

app.listen(3000, ()=>{
    console.log(`3000번 포트로 서버 실행중 ...`);
    connectDB();
});