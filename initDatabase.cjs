var mysql = require('mysql');
const { faker } = require('@faker-js/faker');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let dropDbSql = `DROP DATABASE IF EXISTS BookingIasi`;

  con.query(dropDbSql, function(err, result) {
    if (err) throw err;
    console.log("Database dropped.");

    let createDbSql = `CREATE DATABASE BookingIasi`;

    con.query(createDbSql, function(err, result) {
      if (err) throw err;
      console.log("Database created.");

      con.end(function(err) {
        if (err) throw err;

        var conDB = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "BookingIasi"
        });

        conDB.connect(async function(err) {
          if (err) throw err;
          console.log("Connected to BookingIasi!");

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

          await new Promise((res) => {
            conDB.query(createTableSql, function(err, result) {res(result)});
          })

          let insertSql = `INSERT INTO users 
          (email, givenName, familyName, password, username, birthDate, height, weight, gender, needsSpecialAssistance, userAgreedToFetchData, activityIndex) 
          VALUES 
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        
          let userData = [
            ['jane.doe@example.com', 'Jane', 'Doe', 'hashed_password', 'janedoe', '1990-01-01', 165.5, 60.2, 'female', false, true, 120],
            ['john.smith@example.com', 'John', 'Smith', 'another_hashed_password', 'johnsmith', '1985-05-15', 180.4, 80.5, 'male', false, true, 150],
            ['alex.taylor@example.com', 'Alex', 'Taylor', 'secure_hash', 'alextaylor', '1995-08-22', 172.7, 75.3, 'other', true, true, 180],
            ['sam.jordan@example.com', 'Sam', '', 'pass_hash', 'samj', '2000-12-01', 160.2, 55.8, 'female', false, false, 95],
            ['casey.lee@example.com', 'Casey', 'Lee', 'password123', 'caseyl', '1978-03-30', 168.9, 68.4, 'other', true, true, 110],
            ['mike.brown@example.com', 'Mike', 'Brown', 'mikepass', '', '1988-07-19', 175.3, 88.5, 'male', false, true, 130],
          ];
          
        
          userData.forEach(user => {
            new Promise((res) => {
              conDB.query(insertSql, user, function(err, result) {
                if (err) throw err;
                console.log("User record inserted:", result.insertId);
                res(result);
              });
            })
          });

          /**Hotel table structure */

          let createTableSql1 = `CREATE TABLE IF NOT EXISTS hotelGeneral (
            id INT AUTO_INCREMENT PRIMARY KEY,
            imagePath TEXT,
            occupancy INT,
            accommodationCategory VARCHAR(255),
            name VARCHAR(255) NOT NULL,
            amenityFeature TEXT,
            checkinTime TIME,
            checkoutTime TIME,
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

          let insertSql1 = `INSERT INTO hotelGeneral
          (imagePath, occupancy, accommodationCategory, name, amenityFeature, checkinTime, checkoutTime, permittedUsage, petsAllowed, description, email, employee, address, aggregateRating, review, telephone, smokingAllowed, event, hotelPhotos, maximumAttendeeCapacity, currenciesAccepted, openingHours, paymentAccepted, priceRange, hasCertification, parkingFacility)
          VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            let hotelData = [
              [ 'BookingIasi/images/Gaudeamus', 362, 'Student Housing', 'Camin Gaudeamus', 'private bathroom, air conditioning, fridge, TV, telephone, etc.', '22:00', '07:00', 'Students can stay here of the "Alexandru Ioan Cuza" University in Iasi, students who come through the Erasmus-Socrates programs, teaching staff from abroad who come through university partnerships, to courses organized at the university level and all those from the university network who request accommodation for symposia, colloquiums, days academic etc.', false, 'Gaudeamus Dormitory, came into operation in December 1998, construction and equipment works were completed in August 2002. Currently, the Dormitory has 362 accommodation places and two conference rooms. Located close to important academic objectives and student campuses, offers University students and professors from abroad special accommodation conditions in rooms with 2 and 3 beds.', 'lidia.vranceanu@uaic.ro', 'Financial administrator: Lidia VRANCEANU', 'Str. Codrescu Nr.1, Iași', 4.3, 'Good: the services at the facilities are really competent and helpful, as well as fast; the rose garden in front is really pretty; the interior environment is not bad because of the natural stone floors and walls; the reception is open 24/7 and you can buy some juice and water there; the kitchen is not bad and was always spacious enough for the whole floor; the cafeteria is not bad and really worth the money; the rooms are spacious enough for two people living in the room; there are some surveillance cameras on the floors so that no one enters your room unseen', '0232201102', false, 'allowed', 'yes', 400, '07:00', 'Cash and card',  '600-800', true, true ],
              [ 'BookingIasi/images/Akademos',   312,  'Student Housing',  'Camin Akademos',  'air conditioning, own bathroom and shower cabins, fridge, modern furniture, internet connection.', '10:00' ,  '07:00',  ' Students of the "Alexandru Ioan Cuza" University in Iasi can stay here, students who come through the Erasmus-Socrates programs, teaching staff from abroad who come through university partnerships, to courses organized at the university level and all those from the university network who request accommodation for symposia, colloquiums, academic days, etc.', false,    'The "Akademos" dormitory came into operation in 2007 and the works and facilities were completed in August 2008 when the last two sections were put into use 312 places to stay. The location near the "Mihai Eminescu" Central University Library and the Student Cultural Center offers students the opportunity to spend their time in a constructive and pleasant way. Students staying here can reach classes in less than 10 minutes, on foot.', 'valentin.burdea@uaic.ro',  'Financial administrator: Valentin BURDEA',  'Str. Păcurari, no. 6', 4.6,  'Student dormitory with hotel regime. Very good conditions, spacious rooms, pleasant atmosphere, canteen in the dormitory and own laundry.',  '0232201102 ',   false,   'allowed',  'yes',   500,   'RON',    '07:00',    'Cash and card',  '700-900', true, true ],
          ];
          hotelData.forEach(hotel => {
            new Promise((res) => {
              conDB.query(insertSql1, hotel, function(err, result) {
                if (err) throw err;
                console.log("Hotel accomodation record inserted:", result.insertId);
                res(result);
              });
            })
          });


          /**Hotel rooms table structure */

          let createTableSql3 = `CREATE TABLE IF NOT EXISTS rooms (
            id INT AUTO_INCREMENT PRIMARY KEY,
            idHotel INT,
            numberOfBedrooms INT,
            numberOfRooms INT,
            bed VARCHAR(255),
            floorLevel VARCHAR(255)
          );`;

          await new Promise((res) => {
            conDB.query(createTableSql3, function(err, result) {res(result); console.log(result)});
          })

          const insertSql3 = `INSERT INTO rooms
          (idHotel, numberOfBedrooms, numberOfRooms, bed, floorLevel)
          VALUES
          (?, ?, ?, ?, ?)`;


          let roomsDate = [
            [1, 2, 312, 'single', '5'],
            [2, 2, 362, 'single', '4'],
          ];


          roomsData.forEach(user => {
            new Promise((res) => {
              conDB.query(insertSql3, user, function(err, result) {
                if (err) throw err;
                console.log("User record inserted:", result.insertId);
                res(result);
              });
            })
          });

          //end

          /** Cod existent inainte - start */

          // let createTableSql1 = `CREATE TABLE IF NOT EXISTS accommodations (
          //   id INT AUTO_INCREMENT PRIMARY KEY,
          //   imagePath TEXT,
          //   imagePinpoints TEXT,
          //   bed VARCHAR(255),
          //   occupancy INT,
          //   accommodationCategory VARCHAR(255),
          //   name VARCHAR(255) NOT NULL,
          //   amenityFeature TEXT,
          //   floorLevel VARCHAR(255),
          //   checkinTime TIME,
          //   checkoutTime TIME,
          //   numberOfBedrooms INT,
          //   numberOfRooms INT,
          //   permittedUsage VARCHAR(255),
          //   petsAllowed BOOLEAN,
          //   description TEXT,
          //   email VARCHAR(255),
          //   employee VARCHAR(255),
          //   address TEXT,
          //   aggregateRating DECIMAL(3, 2),
          //   review TEXT,
          //   telephone VARCHAR(255),
          //   smokingAllowed BOOLEAN,
          //   event VARCHAR(255),
          //   hotelPhotos TEXT,
          //   maximumAttendeeCapacity INT,
          //   currenciesAccepted VARCHAR(255),
          //   openingHours VARCHAR(255),
          //   paymentAccepted VARCHAR(255),
          //   priceRange VARCHAR(255),
          //   hasCertification BOOLEAN,
          //   parkingFacility BOOLEAN
          // );`;


          // await new Promise((res) => {
          //   conDB.query(createTableSql1, function(err, result) {res(result)});
          // })
          // const insertSql1 = `INSERT INTO accommodations 
          // (imagePath, imagePinpoints, bed, occupancy, accommodationCategory, name, amenityFeature, floorLevel, checkinTime, checkoutTime, numberOfBedrooms, numberOfRooms, permittedUsage, petsAllowed, description, email, employee, address, aggregateRating, review, telephone, smokingAllowed, event, hotelPhotos, maximumAttendeeCapacity, currenciesAccepted, openingHours, paymentAccepted, priceRange, hasCertification, parkingFacility) 
          // VALUES 
          // (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

          // for (let i = 0; i < 10; i++) { 
          //   const data = [
          //     faker.image.imageUrl(),
          //     faker.image.imageUrl(),
          //     faker.random.word(),
          //     faker.datatype.number({min: 1, max: 4}),
          //     faker.commerce.productMaterial(),
          //     faker.commerce.productName(),
          //     faker.commerce.productDescription(),
          //     faker.datatype.string(1),
          //     faker.datatype.datetime().toTimeString().slice(0, 8),
          //     faker.datatype.datetime().toTimeString().slice(0, 8),
          //     faker.datatype.number({min: 1, max: 5}),
          //     faker.datatype.number({min: 1, max: 10}),
          //     faker.random.word(),
          //     faker.datatype.boolean(),
          //     faker.lorem.sentence(),
          //     faker.internet.email(),
          //     faker.person.fullName(),
          //     faker.address.streetAddress(),
          //     faker.datatype.number({min: 1, max: 5, precision: 0.1}),
          //     faker.lorem.sentence(),
          //     faker.phone.number(),
          //     faker.datatype.boolean(),
          //     faker.lorem.word(),
          //     faker.image.imageUrl(),
          //     faker.datatype.number({min: 10, max: 500}),
          //     faker.finance.currencyCode(),
          //     faker.random.word(),
          //     faker.finance.transactionType(),
          //     faker.commerce.price(),
          //     faker.datatype.boolean(),
          //     faker.datatype.boolean()
          //   ];
          //   await new Promise((res) => {
          //     conDB.query(insertSql1, data, function(err, result) {
          //       if (err) throw err;
          //       console.log("Random accommodation record inserted:", result.insertId);
          //       res(result);
          //     });
          //   })
          // }

          /**Cod existent inainte - end */

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

          for (let i = 0; i < 10; i++) { 
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
