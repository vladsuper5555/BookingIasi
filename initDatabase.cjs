var mysql = require('mysql');

// Connection setup without specifying a database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  // SQL statement to drop the existing database
  let dropDbSql = `DROP DATABASE IF EXISTS BookingIasi`;

  con.query(dropDbSql, function(err, result) {
    if (err) throw err;
    console.log("Database dropped.");

    // SQL statement to create the database
    let createDbSql = `CREATE DATABASE BookingIasi`;

    con.query(createDbSql, function(err, result) {
      if (err) throw err;
      console.log("Database created.");

      // Close initial connection
      con.end(function(err) {
        if (err) throw err;

        // Reconnect with the specific database selected
        var conDB = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "BookingIasi"
        });

        conDB.connect(function(err) {
          if (err) throw err;
          console.log("Connected to BookingIasi!");

          // SQL statement to create a table
          let createTableSql = `CREATE TABLE IF NOT EXISTS test (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
          )`;

          // Execute the create table SQL
          conDB.query(createTableSql, function(err, result) {
            if (err) throw err;
            console.log("Table created or already exists.");

            // SQL statement to insert a row
            let insertSql = `INSERT INTO test (name) VALUES ('Ion')`;

            // Execute the insert SQL
            conDB.query(insertSql, function(err, result) {
              if (err) throw err;
              console.log("1 record inserted");

              // Close the connection
              conDB.end(function(err) {
                if (err) throw err;
                console.log('Closed the database connection.');
              });
            });
          });
        });
      });
    });
  });
});
