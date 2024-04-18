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
        autoLoad: true,
        hotSpots: [
            {
                "pitch": 1.1,
                "yaw": 101.5,
                "type": "scene",
                "text": "Baltimore Museum of Art",
                "sceneId": "Bathroom"
            },
        ]
    },
}

function getConfigDEMO() { // TO DELETE after we implement the database
    return panoramaConfig;
}

function getPanorama(hotel, room) {
    // ...
}

function getPanoramaScene(hotel, room, scene) {
    // ...
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
