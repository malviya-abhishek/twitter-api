const mysql = require("mysql");

const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"password",

    database:"mydb"
})

connection.connect(function (err) {
    if (err) {
        console.log(err);
    }
    else{
      console.log("connected");

      // Database creation
      // const sqlCmd = "CREATE DATABASE mydb";

      // Table creation
      // const sqlCmd = "CREATE TABLE customer (name VARCHAR(255), address VARCHAR(255))";

    //   Inserting a value in table
        // const sqlCmd = "INSERT INTO customer (name, address) VALUES ('Company Inc', 'Highway 37')";

       // query from table
       const sqlCmd = "SELECT * FROM customer";


        connection.query(sqlCmd, function (err, result, fields) {
            if (err) throw err;
            console.log(result);
         });
    }
})