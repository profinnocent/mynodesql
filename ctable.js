const express = require('express');
const mysql = require('mysql');

const app = express();

//Create DB connection
 var dbconnection = mysql.createConnection({
   
    host     : 'eu-cdbr-west-02.cleardb.net',
    user     : 'bbeed19b5da297',
    password : 'acc38556',
    database : 'heroku_78aa321fdffc1fd'
    
  });



  dbconnection.connect((err) => {
    if (err){
       throw err;
    }else{   
      console.log("Connected!");

      //var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
      let sql = 'CREATE TABLE customers' (
          ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
          NAME VARCHAR(50) NOT NULL,
          EMAIL VARCHAR(50) NOT NULL,
          PASSWORD VARCHAR(50) NOT NULL,
          BALANCE INT(11) NOT NULL,
        );

        dbconnection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    }  
  });
