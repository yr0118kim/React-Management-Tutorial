const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const conn = 
{
    "host": "localhost",
    "port": "3306",
    "user": "user2",
    "password": "1234",
    "database": "practice"
}

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

const connection = mysql.createConnection(conn
//   {
//   host: conf.host,
//   user:conf.user,
//   password:conf.password,
//   port:conf.port,
//   database:conf.database
// }
);

connection.connect();

const multer = require('multer');
const upload = multer({dest:'./upload'})

app.get('/api/customers',(req,res)=>{
    connection.query(
      "SELECT * FROM CUSTOMER",
      (err,rows,fields)=>{
        res.send(rows);
      }
    )

});
app.use('/image',express.static('./upload'));
app.post('/api/customers',upload.single('image'),(req,res) =>{
  console.log('req: '+req.file);
  let sql = 'INSERT INTO CUSTOMER VALUES (null,?,?,?,?,?,now(),0)';
  let image = 'http://localhost:5000/image/' + req.file.filename; 
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  console.log(name);
  console.log(image);
  console.log(birthday);
  console.log(gender);
  console.log(job);
  let params = [image,name,birthday,gender,job];
  connection.query(sql,params,
    (err,rows,fields)=>{
      res.send(rows);
      console.log(err);
      console.log(rows);
    })
})
app.delete('/api/customers/:id',(req,res)=>{
  let sql = "DELETE FROM CUSTOMER WHERE id = ?";
  let params = [req.params.id];
  connection.query(sql,params,
    (err,rows,fields)=>{
      res.send(rows);
    }
  )
});

app.listen(port,()=>
    console.log(`Listening on port ${port}`)
);
