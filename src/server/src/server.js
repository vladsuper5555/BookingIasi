const PORT = 3002;
import express from "express"
import panoramasRouter from './routes/panoramas/panoramas.router';
// import hotelsRouter ... etc.
import {runQueryOnDatabaseAndFetchEntireResult, runAsyncQueryOnDatabase} from "./models/database.model.js";

const server = express();

// middleware
/*server.use(cors({  // ?!
    origin: 'http://localhost:5173'
}));*/
server.use(express.json());

server.use('/api', panoramasRouter); // to change to panoramas

// TEST PURPOSE ONLY TO BE DELETED
server.get('/api/databaseTest', async (req, res) => {
    const data = await runQueryOnDatabaseAndFetchEntireResult("SELECT * FROM users");
    res.send(data);
    res.end();
})

// TO BE DELETED
server.post('/api/cegrupasuntem', (req, res) => { // here get would work but in the frontend we do it this way
    res.send(JSON.stringify({name: "E1"}));
    res.end();
});
//

async function startServer() {
    server.listen(PORT, () => console.log(`Server started on PORT ${PORT}!`));
}

startServer();