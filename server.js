const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers',(req,res)=>{
    res.send([{
        'id': 1,
        'image': 'https://placeimg.com/64/64/1',
        'name': '김예림',
        'birthday': '060118',
        'gender': '여자',
        'job': 'student'
      }, {
        'id': 2,
        'image': 'https://placeimg.com/64/64/2',
        'name': '김예봄',
        'birthday': '060118',
        'gender': '여자',
        'job': 'student'
      }, {
        'id': 3,
        'image': 'https://placeimg.com/64/64/3',
        'name': '김주완',
        'birthday': '060118',
        'gender': '남자',
        'job': 'student'
      }]
      );

})
app.listen(port,()=>
    console.log(`Listening on port ${port}`)
);
