import { runQueryOnDatabaseAndFetchEntireResult } from '../../models/database.model.js';
import axios from 'axios';

const GOOGLE_API_KEY = 'AIzaSyCvfa8irF4pMptGASnnw5J-TjkdlyliGuU';

async function getHotelsNamesFromDatabase(req, res) {
    try {
        const sqlQuery = `SELECT Nume_hotel from Hoteluri`;
        const hotels = await runQueryOnDatabaseAndFetchEntireResult(sqlQuery);
        console.log(hotels);
        const hotelNames = hotels.map(hotel => hotel.Nume_hotel);
        res.status(200).send({ success: true, hotelNames });
    } catch (error) {
        console.error('Error on hotel names: ', error);
        res.status(500).send({ success: false, message: 'Server error' });
    }
    res.end();
}

async function getAttractionsForHotel(req, res) {
    const hotelName = req.body.hotelName;
    try {
        const sqlQuery = 
            `SELECT Nume_atractie, Distanta_de_la_hotel, Categorie, Descriere
            FROM Atractii_turistice
            WHERE ID_hotel = (
                SELECT ID_hotel 
                FROM Hoteluri 
                WHERE Nume_hotel = '${hotelName}'
            )`;
        
        const attractions = await runQueryOnDatabaseAndFetchEntireResult(sqlQuery);
        res.status(200).json({ success: true, attractions });
    } catch (error) {
        console.error('Error fetching attractions for hotel: ', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
    res.end();
}

async function getHotelIdByName(req, res) {
    const hotelName = req.body.hotelName;
    try {

      const sqlQuery = `
        SELECT id, name 
        FROM hotelGeneral 
        WHERE name = '${hotelName}'
      `;
      
      const hotelIdResult = await runQueryOnDatabaseAndFetchEntireResult(sqlQuery);
      
      if (hotelIdResult.length > 0) {
        const hotelId = hotelIdResult[0].id;
        res.status(200).json({ success: true, hotelId });
      } else {
        res.status(404).json({ success: false, message: 'Hotel not found' });
      }
    } catch (error) {
      console.error('Error fetching hotel ID: ', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
    res.end();
  }

async function getAttractionsAndHotelCoordinates(req, res) {
    const hotelName = req.body.hotelName;
    try {
        const sqlQuery = `
            SELECT Atractii_turistice.Nume_atractie, Atractii_turistice.Distanta_de_la_hotel, Atractii_turistice.Categorie, Atractii_turistice.Descriere, Hoteluri.ADRESA_COORDONATE 
            FROM Atractii_turistice
            JOIN Hoteluri ON Atractii_turistice.ID_hotel = Hoteluri.ID_hotel
            WHERE Hoteluri.Nume_hotel = '${hotelName}'
        `;

        const attractions = await runQueryOnDatabaseAndFetchEntireResult(sqlQuery);
        res.status(200).json({ success: true, attractions });
    } catch (error) {
        console.error('Error fetching attractions and hotel coordinates: ', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
    res.end();
}


async function getAttractionsWithDirections(req, res) {
    const { hotelName, difficulty, trails } = req.body;
    try {

        const sqlQuery1 = `
        SELECT id
        FROM hotelGeneral 
        WHERE name = 'Muzeul de Istorie a Moldovei'
      `;
      const hotelIdResult1 = await runQueryOnDatabaseAndFetchEntireResult(sqlQuery1);
        console.log("ADSFSDF:" + hotelIdResult1)

        const origin = `${hotelName},Iasi`;
        const waypoints = trails[difficulty].map(name => `${name},Iasi`).join('|');
        const destination = origin;

        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&waypoints=optimize:true|${waypoints}&key=${GOOGLE_API_KEY}`;

        const response = await axios.get(url);
        const directions = response.data;

        res.status(200).json({ success: true, directions });
    } catch (error) {
        console.error('Error fetching attractions with directions: ', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

async function getUserActivityIndex(req, res) {
    try {
        const username = req.cookies.username;
        const sqlQuery = `SELECT activityIndex FROM users WHERE username = '${username}'`;

        const result = await runQueryOnDatabaseAndFetchEntireResult(sqlQuery);
        if (result.length > 0) {
            const activityIndex = result[0].activityIndex;
            res.status(200).json({ success: true, activityIndex });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user activity index: ', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
    res.end();
}

export { getHotelsNamesFromDatabase, getAttractionsForHotel, getAttractionsWithDirections, getAttractionsAndHotelCoordinates, getHotelIdByName, getUserActivityIndex };