module.exports = (app, fs) => {

    // http://127.0.0.1:3000 (get)
    app.get('/', (req, res) => {
        console.log('module1.js 실행');
        res.render('./index.html', {
            length: 10
        });
    });

    // http://127.0.0.1:3000/about (get)
    app.get('/about', (req, res) => {
        res.render('./about.html');
    });

    // http://127.0.0.1:3000/list (get)
    app.get('/list', (req, res) => {
        fs.readFile( __dirname + "/../data/member.json", "utf-8", (err, data) => {
            if(err){
                console.log(err);
            }else{
                console.log(data);
                res.writeHead(200, {'content-type':'text/json;charset=utf-8'});
                res.end(data);
            }
        });
    });

    // http://127.0.0.1:3000/joinMember/avocado (post)
    // http://127.0.0.1:3000/joinMember?id=avocado (get) -> req.query.id
    app.post('/joinMember/:userid', (req, res) => {
        const result = {};
        const userid = req.params.userid;
        if(!req.body["password"] || !req.body["name"]){
            result["code"] = 100;   // 100 : 실패
            result["msg"] = "매개변수가 전달되지 않음";
            res.json(result);
            return false;
        }

        fs.readFile( __dirname + "/../data/member.json", "utf-8", (err, data) => {
            if(err){
                console.log(err);
            }else{
                const member = JSON.parse(data);
                if(member[userid]){
                    result["code"] = 101;   // 중복된 아이디
                    result["msg"] = "중복된 아이디";
                    res.json(result);
                    return false;
                }
                console.log(req.body);
                member[userid] = req.body;
                /*
                    member["avocado"] = {
                                            "name":"안카도",
                                            "password":"0000",
                                            "gender":"남자"
                                        }
                */
                fs.writeFile( __dirname + "/../data/member.json", JSON.stringify(member, null, '\t'), 'utf-8', (err, data) => {
                    if(err){
                        console.log(err);
                    }else{
                        result["code"] = 200;
                        result["msg"] = "성공";
                        res.json(result);
                    }
                });
            }
        });
    });

    // http://127.0.0.1:3000/updateMember/avocado (put)
    app.put('/updateMember/:userid', (req, res) => {
        const result = {};
        const userid = req.params.userid;

        if(!req.body["password"] || !req.body["name"]){
            result["code"] = 100;   // 100 : 실패
            result["msg"] = "매개변수가 전달되지 않음";
            res.json(result);
            return false;
        }

        fs.readFile( __dirname + "/../data/member.json", "utf-8", (err, data) => {
            if(err){
                console.log(err);
            }else{
                const member = JSON.parse(data);
                member[userid] = req.body;
                fs.writeFile( __dirname + "/../data/member.json", JSON.stringify(member, null, '\t'), 'utf-8', (err, data) => {
                    if(err){
                        console.log(err);
                    }else{
                        result["code"] = 200;
                        result["msg"] = "성공";
                        res.json(result);
                    }
                });
            }
        });
    });

    // http://127.0.0.1:3000/deleteMember/avocado (delete)
    app.delete('/deleteMember/:userid', (req, res) => {
        const result = {};
        fs.readFile( __dirname + "/../data/member.json", "utf-8", (err, data) => {
            if(err){
                console.log(err);
            }else{
                const member = JSON.parse(data);
                if(!member[req.params.userid]){
                    result["code"] = 102;
                    result["msg"] = "사용자를 찾을 수 없음";
                    res.json(result);
                    return false;
                }
                delete member[req.params.userid];
                fs.writeFile( __dirname + "/../data/member.json", JSON.stringify(member, null, '\t'), 'utf-8', (err, data) => {
                    if(err){
                        console.log(err);
                    }else{
                        result["code"] = 200;
                        result["msg"] = "성공";
                        res.json(result);
                    }
                });
            }
        });
    });

};