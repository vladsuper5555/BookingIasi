var mysql = require("mysql");
const { faker } = require("@faker-js/faker");
const fs = require("node:fs");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

con.connect(async function (err) {
  if (err) throw err;
  console.log("Connected!");

  try {
    await queryAsync(con, `DROP DATABASE IF EXISTS BookingIasi`);
    console.log("Database dropped.");

    await queryAsync(con, `CREATE DATABASE IF NOT EXISTS BookingIasi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log("Database created.");

    con.end();

    var conDB = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "BookingIasi",
    });

    conDB.connect(async function (err) {
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

      await queryAsync(conDB, createTableSql);

      let insertSql = `INSERT INTO users 
      (email, givenName, familyName, password, username, birthDate, height, weight, gender, needsSpecialAssistance, userAgreedToFetchData, activityIndex) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      let userData = [
        [
          "jane.doe@example.com",
          "Jane",
          "Doe",
          "hashed_password",
          "janedoe",
          "1990-01-01",
          165.5,
          60.2,
          "female",
          false,
          true,
          120,
        ],
        [
          "john.smith@example.com",
          "John",
          "Smith",
          "another_hashed_password",
          "johnsmith",
          "1985-05-15",
          180.4,
          80.5,
          "male",
          false,
          true,
          150,
        ],
        [
          "alex.taylor@example.com",
          "Alex",
          "Taylor",
          "secure_hash",
          "alextaylor",
          "1995-08-22",
          172.7,
          75.3,
          "other",
          true,
          true,
          180,
        ],
        [
          "sam.jordan@example.com",
          "Sam",
          "",
          "pass_hash",
          "samj",
          "2000-12-01",
          160.2,
          55.8,
          "female",
          false,
          false,
          95,
        ],
        [
          "casey.lee@example.com",
          "Casey",
          "Lee",
          "password123",
          "caseyl",
          "1978-03-30",
          168.9,
          68.4,
          "other",
          true,
          true,
          110,
        ],
        [
          "mike.brown@example.com",
          "Mike",
          "Brown",
          "mikepass",
          "",
          "1988-07-19",
          175.3,
          88.5,
          "male",
          false,
          true,
          130,
        ],
      ];

      for (let user of userData) {
        await queryAsync(conDB, insertSql, user);
        console.log("User record inserted");
      }

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
        permittedUsage VARCHAR(512),
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

      await queryAsync(conDB, createTableSql1);

          let insertSql1 = `INSERT INTO hotelGeneral
          (imagePath, occupancy, accommodationCategory, name, amenityFeature, checkinTime, checkoutTime, permittedUsage, petsAllowed, description, email, employee, address, aggregateRating, review, telephone, smokingAllowed, event, hotelPhotos, maximumAttendeeCapacity, currenciesAccepted, openingHours, paymentAccepted, priceRange, hasCertification, parkingFacility)
          VALUES
          (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
          let hotelData = [
            ['BookingIasi/images/Unirea', 
              186, 
              'Hotel 4 stars' , 
              'Unirea Hotel & Spa', 
              'Offers features such as an indoor swimming pool, free parking, free WiFi, spa and wellness centre, family rooms and even airport shuttle. It has 2 restaurants, you can find a tea/coffee maker in all rooms and bar.',
              '14:00',
              '12:00',
              'At Hotel Unirea can stay every person that has a reservation',
              true,
              'Centrally located on Union Square in the heart of Iasi, steps away of Alexandru Ioan Cuza University, Unirea Hotel & Spa provides free access to an indoor pool, jacuzzi and fitness centre. Copou Park, where you can find Eminescu’s Linden Tree, is a 10-minute walk away.',
               'comercial@hotelunirea.ro', 
               'Lucian Grecu',
               'Piața Unirii 5, Iași 700056', 
               4.5, 
               'Clean room, extremely varied breakfast. At some point, the omelette could be ordered separately and you chose the ingredients, it was prepared in front of you. The coffee is not exactly the best considering such a hotel. Totally, the experience is a satisfying one.', 
               '0232205278', 
               false, 
               'allowed',
               'yes',
               360, 
               'RON', 
               '24 hours', 
               'Cash or card', 
               '500-700', 
               true, 
               true],
               
              ['BookingIasi/images/ApartamentHotelPrestige', 
              17, 
              'Hotel',
              'Prestige Hotel', 
              'Offers features such as air conditioning, private bathroom and shower cabins, fridge, modern furniture and internet connection.', 
              '14:00', 
              '07:00',
              'Making a reservation and arriving within the agreed time frame is necessary to gain access to the establsihment', 
              false, 
              'Prestige Hotel is a historical monument. It has a spot on the Iasi monument list at nr.1112, code IS-II-B-03933. The first owners of this building were Iancu and Victoria Corjescu in 1895. In 2011, the building was claimed by the descendants of the Cerchez family, namely Don Rosetti Maria Ioana, Rosetti Scarlat Alexandru Anton and Rosetti Catrina Irina. Political meetings with important people of the time took place here. From 2014 until today, this building belongs to the owners Cogălniceanu Dumitru and Cogălniceanu Geta.',            
              'prestigehotel@gmail.com',             
              '-',            
              'Str Titu Maiorescu, Nr. 1, Iasi, Romania',           
              4.6,            
              'I recommend this location, friendly staff, parking space, varied breakfast, spacious room, clean linen, also suitable for children. We will return for sure.',           
              '0724502502 ',             
              false,             
              '-',             
              'yes',             
              50,             
              'RON',             
              '07:00',             
              'Cash and card',             
              '329-499',            
              true,            
              true,          
            ]
          ];
          hotelData.forEach((hotel) => {
            new Promise((res) => {
              conDB.query(insertSql1, hotel, function (err, result) {
                if (err) throw err;
                console.log(
                  "Hotel accomodation record inserted:",
                  result.insertId
                );
                res(result);
              });
            });
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

      await queryAsync(conDB, createTableSql3);

      const insertSql3 = `INSERT INTO rooms
      (idHotel, numberOfBedrooms, numberOfRooms, bed, floorLevel)
      VALUES
      (?, ?, ?, ?, ?)`;

          let roomsData = [
            [1, 2, 186, 'single or double', '13'],
            [2, 2, 17, 'single or double', '1'],
          ];

      for (let room of roomsData) {
        await queryAsync(conDB, insertSql3, room);
        console.log("Room record inserted");
      }

      let createTableSql2 = `CREATE TABLE IF NOT EXISTS attractions (
        idHotel INT,
        descrierePOI VARCHAR(255),
        urlGoogleMapsPOI VARCHAR(255),
        titluPOI VARCHAR(255)
      );`;

      await queryAsync(conDB, createTableSql2);

      const insertSql2 = `INSERT INTO attractions 
      (idHotel, descrierePOI, urlGoogleMapsPOI, titluPOI) 
      VALUES 
      (?, ?, ?, ?)`;

      for (let i = 0; i < 10; i++) {
        const data = [
          faker.number.int({ min: 1, max: 5 }),
          faker.lorem.sentence(),
          faker.image.url(),
          faker.lorem.word(),
        ];
        await queryAsync(conDB, insertSql2, data);
        console.log("Random attraction record inserted");
      }

      let createTableHoteluri = `CREATE TABLE IF NOT EXISTS Hoteluri (
        ID_hotel INT PRIMARY KEY,
        Nume_hotel VARCHAR(255),
        Adresa VARCHAR(255),
        Telefon VARCHAR(20),
        Rating DECIMAL(3, 1),
        Latitudine DECIMAL(9, 6),
        Longitudine DECIMAL(9, 6),
        Adresa_coordonate VARCHAR(255),
        Latitudine_hotel DECIMAL(9, 6),
        Longitudine_hotel DECIMAL(9, 6)
      );`;

      await queryAsync(conDB, createTableHoteluri);

      const hoteluriInsert = `INSERT INTO Hoteluri 
      (ID_hotel, Nume_hotel, Adresa, Telefon, Rating, Latitudine, Longitudine, Adresa_coordonate, Latitudine_hotel, Longitudine_hotel) 
      VALUES 
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      try {
        const hoteluriFileContent = fs.readFileSync("Hoteluri.json", "utf8");
        const fileData = JSON.parse(hoteluriFileContent);
        for (let hotel of fileData.Hoteluri) {
          var data = Object.values(hotel);
          await queryAsync(conDB, hoteluriInsert, data);
          console.log("Hotel record inserted");
        }
      } catch (err) {
        console.error(err);
      }

      let createTableAtractii = `CREATE TABLE IF NOT EXISTS Atractii_turistice (
        ID_atractie INT PRIMARY KEY,
        Nume_atractie VARCHAR(255),
        Descriere VARCHAR(4000),
        Adresa VARCHAR(255),
        Latitudine DECIMAL(9, 6),
        Longitudine DECIMAL(9, 6),
        ID_hotel INT,
        Adresa_coordonate VARCHAR(255),
        Latitudine_atractie DECIMAL(9, 6),
        Longitudine_atractie DECIMAL(9, 6),
        Categorie VARCHAR(100),
        Distanta_de_la_hotel DECIMAL(10, 2)
      );`;

      await queryAsync(conDB, createTableAtractii);

      const atractiiInsert = `INSERT INTO Atractii_turistice
      (Adresa, ID_hotel, Categorie, Descriere, Latitudine, ID_atractie, Longitudine, Nume_atractie, Adresa_coordonate, Latitudine_atractie, Distanta_de_la_hotel, Longitudine_atractie)
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      try {
        const atractiiFileContent = fs.readFileSync("Atractii.json", "utf8");
        const fileData = JSON.parse(atractiiFileContent);
        for (let atractie of fileData.Atractii) {
          var data = Object.values(atractie);
          await queryAsync(conDB, atractiiInsert, data);
          console.log("Attraction record inserted");
        }
      } catch (err) {
        console.error(err);
      }

      conDB.end();
    });
  } catch (err) {
    console.error(err);
  }
});

function queryAsync(con, sql, params = []) {
  return new Promise((resolve, reject) => {
    con.query(sql, params, function (err, result) {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
