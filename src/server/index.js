import express from "express"
import fs from 'node:fs';
import Path from 'node:path'

const server = express();
server.use(express.json())

server.post('/api/cegrupasuntem', (req, res) => { // here get would work but in the frontend we do it this way
    res.send(JSON.stringify({name: "E1"}));
    res.end();
})


server.post('/api/3drender', (req, res) => {
    console.log(req.body);
    const requestedFile = req.body.imagePath;
    const path = Path.join('src', 'server', 'resources', requestedFile, 'index.json');
    fs.readFile(Path.resolve(path), 'utf8',  (err, data) => {
        if (err) return;
        res.send(data);
        res.end();
    })
})

server.listen(3002, () => console.log('Server started'));