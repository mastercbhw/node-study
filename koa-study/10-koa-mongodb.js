

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

var dbName = 'test'



console.time('start1');
MongoClient.connect(url,(err,client)=>{
    if(err){
        console.log(err);
        return;
    }

    var db=client.db(dbName);
    //查询数据
    var result=db.collection('test').find();
    result.toArray((err,docs)=>{
        console.timeEnd('start1');
        console.log(docs);
    })
})


console.time('start2');
MongoClient.connect(url,(err,client)=>{
    if(err){

        console.log(err);
        return;
    }

    var db=client.db(dbName);
    //查询数据

    var result=db.collection('test').find({});

    result.toArray((err,docs)=>{
        console.timeEnd('start2');
        console.log(docs);

    })
})


