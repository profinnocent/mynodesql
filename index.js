const express = require('express');
const mysql = require('mysql');

const app = express();

//Create DB connection
var dbconnection = mysql.createConnection({

    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'mynodesqldb'
    
    /*
    host     : 'pdb11.runhosting.com',
    user     : '2107412_nodemysql',
    password : 'nodemysql1920',
    database : '2107412_nodemysql'
    */
  });

  dbconnection.connect((err) => {
      if(!err){
          console.log('Connection ok');
      }
      else{
          throw err;
      }
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
  })

  
  //Create route to GET or DISPLAY specific customer
  app.get('/users/:id', (req,res) => {
    let sql = `SELECT * FROM customers WHERE id = ${req.params.id}`;

    dbconnection.query(sql, (err, result) => {
        if(err){
            throw err;
        }else{
            console.log(result);
            res.send('Data successfully read');
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
    let sql = `DELETE FROM customers WHERE id = ${req.params.id}`;

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
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});