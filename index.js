const express = require('express');
const mysql = require('mysql');

const app = express();

//Create DB connection
 var dbconnection = mysql.createConnection({

//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'mynodesqldb'
    
    
    host     : 'eu-cdbr-west-02.cleardb.net',
    user     : 'bbeed19b5da297',
    password : 'acc38556',
    database : 'heroku_78aa321fdffc1fd'
    
  });

  dbconnection.connect((err) => {
      if(!err){
          console.log('Connection ok');
      }
      else{
          throw err;
      }
  });


   //Create customers table
//    app.get('/createtable', (req,res) => {
    // dbconnection.connect((err) => {
    //     if (err) throw err;
    //     console.log("Connected!");
    //     //var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
//         let sql = "CREATE TABLE customers (
//             ID INT(11) NOT NULL AUTO INCREMENT PRIMARY KEY,
//             NAME VARCHAR(50) NOT NULL,
//             EMAIL VARCHAR(50) NOT NULL,
//             PASSWORD VARCHAR(50) NOT NULL,
//             BALANCE INT(11) NOT NULL
//           )";
//           dbconnection.query(sql, function (err, result) {
//           if (err) throw err;
//           console.log("Table created");
//           res.send("table created...")
//         });
//       });
// })


    //Create Home page
    app.get('/', (req,res) => {
  
                console.log(res);
                res.send("This is the Home Page");
        });
    

  //Create route to GET or DISPLAY customers
  app.get('/users', (req,res) => {
      let sql = 'SELECT * FROM customers'

    //   dbconnection.query(sql, (err, results) => {
    //       if(err){
    //           throw err;
    //       }else{
    //           console.log(results);
    //           res.send(results);
    //       }
    //   })
  })

  
  //Create route to GET or DISPLAY specific customer
  app.get('/users/:id', (req,res) => {
    let sql = `SELECT * FROM customers WHERE id = ${req.params.id}`;

    // dbconnection.query(sql, (err, result) => {
    //     if(err){
    //         throw err;
    //     }else{
    //         console.log(result);
    //         res.send('Data for user' + req.params.id + ' successfully read');
    //     }
    // })
})

 //Create route to UPDATE a specific customer
 app.get('/updateuser/:id', (req,res) => {
    let newname = 'Mario Rodrigez'; 
    let sql = `UPDATE customers SET Name = '${newname}' WHERE id = ${req.params.id}`;

    // let query = dbconnection.query(sql, (err, result) => {
    //     if(err){
    //         throw err;
    //     }else{
    //         console.log(result);
    //         res.send(`User ${req.params.id} successfully updated`);
    //     }
    // })
})

 //Create route to DELETE a specific customer
 app.get('/deleteuser/:id', (req,res) => {
    let sql = `DELETE FROM customers WHERE id = ${req.params.id}`;

    // let query = dbconnection.query(sql, (err, result) => {
    //     if(err){
    //         throw err;
    //     }else{
    //         console.log(result);
    //         res.send(`User ${req.params.id} successfully deleted...`);
    //     }
    // })
})


  //Create route to INSERT customer
  app.get('/adduser', (req,res) => {
    let user = {Name: 'Mary Ekeh', 
                Email: 'maryekeh@gmail.com',
                Password: 'ekeh',
                Balance: 2200 }  

    let sql = 'INSERT INTO customers SET ?';

    // dbconnection.query(sql, user, (err, result) => {
    //     if(err){
    //         throw err;
    //     }else{
    //         console.log(result);
    //         res.send('User successfully added');
    //     }
    // })
})





//Create and listen to server
let PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on portt " + PORT);
});