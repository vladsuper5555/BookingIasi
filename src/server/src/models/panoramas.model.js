/* example
*a dbconfig.js file might be needed (extra: read about connectionPooling / other efficiency aspects etc.)
--- in controller, we import the functions and use them accordingly
*await/async might be required
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
        keyboardZoom: false,
        hotSpotDebug: true,
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

function getConfig() {
    return panoramaConfig;
}

function updateConfig(newConfig) {
    panoramaConfig.hotSpots = newConfig.hotSpots;
}

export {
    getConfig,
    updateConfig
};
