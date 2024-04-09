var mysql = require('mysql');
const { faker } = require('@faker-js/faker');

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

        conDB.connect(async function(err) {
          if (err) throw err;
          console.log("Connected to BookingIasi!");

          // SQL statement to create a table
          let createTableSql = `CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            givenName VARCHAR(255),
            familyName VARCHAR(255),
            password TEXT NOT NULL,
            username TEXT,
            birthDate DATE,
            height DECIMAL(5, 2),
            weight DECIMAL(5, 2),
            gender ENUM('male', 'female', 'other'),
            needsSpecialAssistance BOOLEAN,
            userAgreedToFetchData BOOLEAN NOT NULL,
            activityIndex DECIMAL(10, 2)
          );`;

          // Execute the create table SQL
          await new Promise((res) => {
            conDB.query(createTableSql, function(err, result) {res(result)});
          })

          let insertSql = `INSERT INTO users 
          (email, givenName, familyName, password, username, birthDate, height, weight, gender, needsSpecialAssistance, userAgreedToFetchData, activityIndex) 
          VALUES 
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
          // Sample user data
          let userData = [
            ['jane.doe@example.com', 'Jane', 'Doe', 'hashed_password', 'janedoe', '1990-01-01', 165.5, 60.2, 'female', false, true, 120],
            ['john.smith@example.com', 'John', 'Smith', 'another_hashed_password', 'johnsmith', '1985-05-15', 180.4, 80.5, 'male', false, true, 150],
            ['alex.taylor@example.com', 'Alex', 'Taylor', 'secure_hash', 'alextaylor', '1995-08-22', 172.7, 75.3, 'other', true, true, 180],
            ['sam.jordan@example.com', 'Sam', '', 'pass_hash', 'samj', '2000-12-01', 160.2, 55.8, 'female', false, false, 95],
            ['casey.lee@example.com', 'Casey', 'Lee', 'password123', 'caseyl', '1978-03-30', 168.9, 68.4, 'other', true, true, 110],
            ['mike.brown@example.com', 'Mike', 'Brown', 'mikepass', '', '1988-07-19', 175.3, 88.5, 'male', false, true, 130],
          ];
          
        
          // Execute the insert statement for each user
          userData.forEach(user => {
            new Promise((res) => {
              conDB.query(insertSql, user, function(err, result) {
                if (err) throw err;
                console.log("User record inserted:", result.insertId);
                res(result);
              });
            })
          });

          let createTableSql1 = `CREATE TABLE IF NOT EXISTS accommodations (
            id INT AUTO_INCREMENT PRIMARY KEY,
            imagePath TEXT,
            imagePinpoints TEXT,
            bed VARCHAR(255),
            occupancy INT,
            accommodationCategory VARCHAR(255),
            name VARCHAR(255) NOT NULL,
            amenityFeature TEXT,
            floorLevel VARCHAR(255),
            checkinTime TIME,
            checkoutTime TIME,
            numberOfBedrooms INT,
            numberOfRooms INT,
            permittedUsage VARCHAR(255),
            petsAllowed BOOLEAN,
            description TEXT,
            email VARCHAR(255),
            employee VARCHAR(255),
            address TEXT,
            aggregateRating DECIMAL(3, 2),
            review TEXT,
            telephone VARCHAR(255),
            smokingAllowed BOOLEAN,
            event VARCHAR(255),
            hotelPhotos TEXT,
            maximumAttendeeCapacity INT,
            currenciesAccepted VARCHAR(255),
            openingHours VARCHAR(255),
            paymentAccepted VARCHAR(255),
            priceRange VARCHAR(255),
            hasCertification BOOLEAN,
            parkingFacility BOOLEAN
          );`;


          await new Promise((res) => {
            conDB.query(createTableSql1, function(err, result) {res(result)});
          })
          const insertSql1 = `INSERT INTO accommodations 
          (imagePath, imagePinpoints, bed, occupancy, accommodationCategory, name, amenityFeature, floorLevel, checkinTime, checkoutTime, numberOfBedrooms, numberOfRooms, permittedUsage, petsAllowed, description, email, employee, address, aggregateRating, review, telephone, smokingAllowed, event, hotelPhotos, maximumAttendeeCapacity, currenciesAccepted, openingHours, paymentAccepted, priceRange, hasCertification, parkingFacility) 
          VALUES 
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          for (let i = 0; i < 10; i++) { // Generate and insert 10 random records
            const data = [
              faker.image.imageUrl(),
              faker.image.imageUrl(),
              faker.random.word(),
              faker.datatype.number({min: 1, max: 4}),
              faker.commerce.productMaterial(),
              faker.commerce.productName(),
              faker.commerce.productDescription(),
              faker.datatype.string(1),
              faker.datatype.datetime().toTimeString().slice(0, 8),
              faker.datatype.datetime().toTimeString().slice(0, 8),
              faker.datatype.number({min: 1, max: 5}),
              faker.datatype.number({min: 1, max: 10}),
              faker.random.word(),
              faker.datatype.boolean(),
              faker.lorem.sentence(),
              faker.internet.email(),
              faker.person.fullName(),
              faker.address.streetAddress(),
              faker.datatype.number({min: 1, max: 5, precision: 0.1}),
              faker.lorem.sentence(),
              faker.phone.number(),
              faker.datatype.boolean(),
              faker.lorem.word(),
              faker.image.imageUrl(),
              faker.datatype.number({min: 10, max: 500}),
              faker.finance.currencyCode(),
              faker.random.word(),
              faker.finance.transactionType(),
              faker.commerce.price(),
              faker.datatype.boolean(),
              faker.datatype.boolean()
            ];
            await new Promise((res) => {
              conDB.query(insertSql1, data, function(err, result) {
                if (err) throw err;
                console.log("Random accommodation record inserted:", result.insertId);
                res(result);
              });
            })
          }

          let createTableSql2 = `CREATE TABLE IF NOT EXISTS attractions (
            idHotel INT,
            descrierePOI VARCHAR(255),
            urlGoogleMapsPOI VARCHAR(255),
            titluPOI VARCHAR(255)
          );`;


          await new Promise((res) => {
            conDB.query(createTableSql2, function(err, result) {res(result); console.log(result)});
          })
          const insertSql2 = `INSERT INTO attractions 
          (idHotel, descrierePOI, urlGoogleMapsPOI, titluPOI) 
          VALUES 
          (?, ?, ?, ?)`;

          for (let i = 0; i < 10; i++) { // Generate and insert 10 random records
            const data = [
              faker.datatype.number({min: 1, max: 5}),
              faker.lorem.sentence(),
              faker.image.imageUrl(),
              faker.random.word(),
            ];
            await new Promise((res) => {
              conDB.query(insertSql2, data, function(err, result) {
                if (err) throw err;
                console.log("Random accommodation record inserted:", result.insertId);
                res(result);
              });
            })
          }
        });
      });
    });
  });
});
