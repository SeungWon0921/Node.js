const client = require('mongodb').MongoClient;
client.connect('mongodb://127.0.0.1:27017/frontend',(err,db)=>{
    if(err){
        console.log(err);
    }else{
        console.log(`connect:${db}`);
        db.close();
    }

});