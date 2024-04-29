import { runQueryOnDatabaseAndFetchEntireResult } from '../../models/database.model.js';
import crypto from 'crypto';
async function checkCredentialsAgainstDatabase(req, res){
    
    const { username, password } = req.body;

    const hash = crypto.createHash('md5');
    hash.update(password);
    const hashedPassword = hash.digest('hex');

    let sqlQuery = `SELECT * FROM users WHERE username = "${username}" AND password = "${hashedPassword}"`;

    let results = await runQueryOnDatabaseAndFetchEntireResult(sqlQuery);

    if (results.length === 0) {
        res.send({ success: false, message: 'Login failed! Invalid username or password' });
    }
    else{
        res.send({ success: true, message: 'Login successful!' });
    }
  
    res.end();
}

async function addCredentialsToDatabase(req, res){
    const { givenName, familyName, username, email, password } = req.body;

    let sqlQuery = `SELECT * FROM users WHERE username = "${username}"`;

    let results = await runQueryOnDatabaseAndFetchEntireResult(sqlQuery);

    if (results.length > 0) {
        res.send({ success: false, message: 'Signup failed! Username already exists.' });
        return;
    }

    const hash = crypto.createHash('md5');
    hash.update(password);
    const hashedPassword = hash.digest('hex');

    let sqlInsertQuery = `INSERT INTO users (givenName, familyName, username, email, password) VALUES ("${givenName}", "${familyName}", "${username}", "${email}", "${hashedPassword}")`;
    let result = await runQueryOnDatabaseAndFetchEntireResult(sqlInsertQuery);
    if (result.error) {
        res.send({ success: false, message: 'An error occurred while signing up. Please try again later.' });
      } else {
        res.send({ success: true, message: 'Signup successful!' });
      }

      res.end();
}

export {
    checkCredentialsAgainstDatabase,
    addCredentialsToDatabase
}