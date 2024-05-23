import { runQueryOnDatabaseAndFetchEntireResult } from '../../models/database.model.js';

async function getHotelsNamesFromDatabase(req, res) {
    try {
        const sqlQuery = `SELECT name from hotelGeneral`;
        const hotels = await runQueryOnDatabaseAndFetchEntireResult(sqlQuery);
        console.log(hotels);
        const hotelNames = hotels.map(hotel => hotel.name);
        res.status(200).send({ success: true, hotelNames });
    } catch (error) {
        console.error('Error on hotel names: ', error);
        res.status(500).send({ success: false, message: 'Server error' });
        res.end();
    }

    res.end();
}

async function getInformationAboutHotel(req, res) {

    const hotelName = req.body.hotelName;
    try {
        const sqlQuery = 
            `SELECT name, checkinTime, checkoutTime, openingHours, priceRange, description, petsAllowed, parkingFacility, smokingAllowed, event, review, aggregateRating, address, email, telephone, paymentAccepted, currenciesAccepted 
            FROM hotelGeneral WHERE name = '${hotelName}'`;
        
            const info = await runQueryOnDatabaseAndFetchEntireResult(sqlQuery);
            res.status(200).json({ success: true, info });
    } catch (error) {
        console.error('Error fetching attractions for hotel: ', error);
        res.status(500).json({ success: false, message: 'Server error' });
        res.end();
    }

    res.end();
}

export { getHotelsNamesFromDatabase, getInformationAboutHotel }