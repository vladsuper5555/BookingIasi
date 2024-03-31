import express from "express"

const server = express();

server.post('/api/cegrupasuntem', (req, res) => { // here get would work but in the frontend we do it this way
    console.log("got a new req", req);
    res.send(JSON.stringify({name: "Bogdan"}));
    res.end();
})
server.listen(3002, () => console.log('Server started'));