/* example
--- in controller, we import the functions and use them accordingly
*await/async might be required
check controller functions to see the prototype of the functions you need to implement and 
throw errors (and messages) accordingly (when hotel/room/panorama do not exist) - only get Functions for now
the below imports will become, obviously, obsolete
*/
import fs from 'node:fs';
import Path from 'node:path';
import * as url from 'url';
import { runQueryOnDatabaseAndFetchEntireResult } from './database.model.js';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const path = Path.join(__dirname, 'hotel_test', 'panorama.json');
// demo, will be changed with db models and the imports will become unnecessary, as well

function readImageURL(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(data).url);
            }
        });
    });
}

const panoramaConfig = {
    imageSource: await readImageURL(path),
    config: {
        hfov: 130,
        pitch: 0,
        yaw: 0,
        autoLoad: true,
        "title": "Hallway View",
        "autoRotate": 2,
        showControls : false,
        hotSpots: [
            {
                "pitch": 0,
                "yaw": -65,
                "type": "scene",
                "text": "Enter C401",
                "sceneId": "Bathroom"
            },
        ]
    },
}

async function getFacilityType(hotelId, facilityType) {
    try {
        
        let ok_id = false;
        let ok_type = false;

        if (existsHotelId(hotelId)) {    
            ok_id = true;
        }

        if (existsFacilityType(facilityType)) {
            ok_type = true;
        }

        if (ok_id && ok_type) {
            return hotelId.concat('/').concat(facilityType);
        } else if(!ok_id) {
            throw new Error(`ID ${hotelId} is not valid.`);
        } else{
            throw new Error(`Facility ${facilityType} is not valid.`);
        }
    } catch (err) {
        console.error('An error has occurred:', err);
    }
}

async function existsHotelId(hotelId){
    let hotelPath = "hoteluri/" + hotelId;
   
    let sqlStatement = "select count(*) from accommodations where imagePath like '%" + hotelPath + "%'";

    let result = await runQueryOnDatabaseAndFetchEntireResult(sqlStatement)
    if(result == 0) {
        return false;
    }
    return true;
}

async function existsFacilityType(hotelId, facilityType){
    let facilityPath = "hoteluri/" + hotelId + "/" + facilityType;
   
    let sqlStatement = "select count(*) from accommodations where imagePath like '%" + facilityPath + "%'";

    let result = await runQueryOnDatabaseAndFetchEntireResult(sqlStatement)
    if(result == 0) {
        return false;
    }
    return true;
}

function getAppartmentId(facilityPath, idAppRequested) {
    try {

        if (existIdRequested(facilityPath, idAppRequested)) {    
            ok_id = true;
        }

        if (ok_id ) {
            return facilityPath.concat('/').concat(idAppRequested);
        } else if(!ok_id) {
            throw new Error(`ID ${idAppRequested} is not valid.`);
        }
    } catch (err) {
        console.error('An error has occurred:', err);
    }
}

async function existIdRequested(facilityType, idAppRequested) {
    let idRequestedPath = facilityPath + "/" + idAppRequested;

    let sqlStatement = "select count(*) from accommodations where imagePath like '%" + idRequestedPath + "%'";

    let result = await runQueryOnDatabaseAndFetchEntireResult(sqlStatement)
    if(result == 0) {
        return false;
    }
    return true;
}

function getRoomType(idRequestedPath, roomType) {
    try {

        if (existsRoomType(idRequestedPath, roomType)) {    
            ok_id = true;
        }

        if (ok_id ) {
            return idRequestedPath.concat('/').concat(roomType);
        } else if(!ok_id) {
            throw new Error(`ID ${roomType} is not valid.`);
        }
    } catch (err) {
        console.error('An error has occurred:', err);
    }
}

async function existsRoomType(idRequestedPath, roomType) {
    let roomTypePath = idRequestedPath + "/" + roomType;

    let sqlStatement = "select count(*) from accommodations where imagePath like '%" + roomTypePath + "%'";

    let result = await runQueryOnDatabaseAndFetchEntireResult(sqlStatement)
    if(result == 0) {
        return false;
    }
    return true;
}


function getConfigDEMO() { // TO DELETE after we implement the database
    return panoramaConfig;
}

function getPanorama(hotel, room) {
    // ...
}

function getPanoramaScene(hotel, room, scene) {
    let path1 = getFacilityType(hotel, roomType);
    let path2 = getAppartmentId(path1, appartmentId);
    let path3 = getRoomType(path2, roomType);

    return path3;

}

function uploadPanorama() {
    // ...
}

function updatePanoramaScene() {
    // ...
}

export {
    getPanorama,
    getPanoramaScene,
    uploadPanorama,
    updatePanoramaScene,
    getConfigDEMO,
};
