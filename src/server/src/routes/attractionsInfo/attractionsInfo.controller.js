import { runQueryOnDatabaseAndFetchEntireResult } from '../../models/database.model.js';

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
        res.end();
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
        res.end();
    }

    res.end();
}

export { getHotelsNamesFromDatabase, getAttractionsForHotel }