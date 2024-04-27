import { runQueryOnDatabaseAndFetchEntireResult } from '../../models/database.model.js';
import crypto from 'crypto';
async function checkCredentialsAgainstDatabase(req, res){
    
    const { username, password } = req.body;
    

    let sqlQuery = `SELECT * FROM users WHERE username = "${username}"`;

    let results = await runQueryOnDatabaseAndFetchEntireResult(sqlQuery);

    if (results.length === 0) {
        res.send({ success: false, message: 'Login failed! Username not found.' });
        return;
    }
  
    const userPasswordFromDB = results[0].password; 
  
    const hash = crypto.createHash('md5');
    hash.update(password);
    const hashedPassword = hash.digest('hex');
  
    if (hashedPassword === userPasswordFromDB) {
        res.send({ success: true, message: 'Login successful!' });
    } else {
        res.send({ success: false, message: 'Login failed! Invalid credentials.' });
    }
    res.end();
}

function addCredentialsToDatabase(req, res){

}

export {
    checkCredentialsAgainstDatabase,
    addCredentialsToDatabase
}