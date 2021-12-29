const client = require('mongodb').MongoClient;
client.connect('mongodb://127.0.0.1:27017',{useUnifiedTopology: true},(err,db)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`connected:${db}`);
        const database = db.db('forntend');
        const members =database.collection('member');
        members.insertMany([{'userid':'avocdo','userpw':'0000','name':'안카도'}],(err,result)=>{
            if(err){
                console.log(err);
            }else{
                console.log('성공!');
            }
        });
    }
});