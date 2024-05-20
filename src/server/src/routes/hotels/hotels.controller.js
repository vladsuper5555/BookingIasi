import { runQueryOnDatabaseAndFetchEntireResult } from '../../models/database.model.js';

async function getHotelsNames(req, res) {
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

export {getHotelsNames}

