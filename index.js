const express = require('express');
const mysql = require('mysql');

const app = express();

//Create DB connection
 var dbconnection = mysql.createConnection({

    //Using localhost DB
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'mynodesqldb'

//Using online msqlDB
    // host     : "https://pdb11.runhosting.com",
    // user     : "2107412_nodemysql",
    // password : "",
    // database : "2107412_nodemysql"
    
    //Mysql ClearDB on Heroku
    host     : "eu-cdbr-west-02.cleardb.net",
    user     : "bbeed19b5da297",
    password : "acc38556",
    database : "heroku_78aa321fdffc1fd"
    
  });

  dbconnection.connect((err) => {
      if(err){
        console.log(err);
      }
      else{
          console.log('Connection ok');
      }
  });


    //Create Home page
    app.get('/', (req,res) => {
        
                console.log(res);
                res.send("This is the Home Page:");
        });
    

  //Create route to GET or DISPLAY customers
  app.get('/users', (req,res) => {
      let sql = 'SELECT * FROM customers'

      dbconnection.query(sql, (err, results) => {
          if(err){
              throw err;
          }else{
              console.log(results);
              res.send(results);
          }
      })
  });

  
  //Create route to GET or DISPLAY specific customer
  app.get('/user/:id', (req,res) => {
    let sql = `SELECT * FROM customers WHERE id = ${req.params.id}`;

    dbconnection.query(sql, (err, result) => {
        if(err){
            throw err;
        }else{
            console.log(result);
            res.send(result);
        }
    })
})

 //Create route to UPDATE a specific customer
 app.get('/updateuser/:id', (req,res) => {
    let newname = 'Mario Rodrigez'; 
    let sql = `UPDATE customers SET Name = '${newname}' WHERE id = ${req.params.id}`;

    let query = dbconnection.query(sql, (err, result) => {
        if(err){
            throw err;
        }else{
            console.log(result);
            res.send(`User ${req.params.id} successfully updated`);
        }
    })
})

 //Create route to DELETE a specific customer
 app.get('/deleteuser/:id', (req,res) => {
    let sql = `DELETE FROM customers WHERE ID = ${req.params.id}`;

    let query = dbconnection.query(sql, (err, result) => {
        if(err){
            throw err;
        }else{
            console.log(result);
            res.send(`User ${req.params.id} successfully deleted...`);
        }
    })
})


  //Create route to INSERT customer
  app.get('/adduser', (req,res) => {
    let user = {Name: 'Mary Ekeh', 
                Email: 'maryekeh@gmail.com',
                Password: 'ekeh',
                Balance: 2200 }  

    let sql = 'INSERT INTO customers SET ?';

    dbconnection.query(sql, user, (err, result) => {
        if(err){
            throw err;
        }else{
            console.log(result);
            res.send('User successfully added');
        }
    })
})





//Create and listen to server
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on portt " + PORT);
});