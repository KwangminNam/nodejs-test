const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended :true}))
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');

let db;

MongoClient.connect('mongodb+srv://rhkd93:ska944@cluster0.uaatmat.mongodb.net/?retryWrites=true&w=majority',(error,client)=>{
  if(error){
    return console.log(error);
  }
  db = client.db('todoapp');
  app.listen(8080 , ()=>{
    console.log("시작!")
  });
})

app.get('/pet',(요청,응답)=>{
  응답.send('펫1111')
})

app.get('/beauty',(요청,응답)=>{
  응답.send('뷰티11')
})

app.get('/',(요청,응답)=>{
  응답.sendFile(  __dirname + '/index.html');
})

app.get('/write',(요청,응답)=>{
  응답.sendFile(  __dirname + '/write.html');
})

// app.post('/add',(요청,응답)=>{
//   응답.send('전송ㄹ완료');
//   console.log(요청.body)
// })

app.post('/add',(req,res)=>{
  res.send('complete!')
  db.collection('post').insertOne({
    제목:req.body.title,
    날짜:req.body.date
  },(에러,결과)=>{
    console.log('저장완료');
  });
})

app.get('/list',(req,res)=>{
  db.collection('post').find().toArray((error,result)=>{
    console.log(result);
    res.render('list.ejs' ,{ posts : result} );
  })
})
 