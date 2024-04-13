import fs from 'node:fs';
import Path from 'node:path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

function getPanorama (req, res) {
    //console.log(req.body);
    const path = Path.join(__dirname, '..', '..', 'models', req.body.imagePath, 'index.json');
    fs.readFile(path, 'utf8',  (err, data) => {
        if (err) 
            return;
        res.send(data);
    });
}

export {
    getPanorama
};