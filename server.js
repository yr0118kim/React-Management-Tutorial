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

app.get('/api/customers',(req,res)=>{
    connection.query(
      "SELECT * FROM CUSTOMER",
      (err,rows,fields)=>{
        res.send(rows);
      }
    )

})
app.listen(port,()=>
    console.log(`Listening on port ${port}`)
);
