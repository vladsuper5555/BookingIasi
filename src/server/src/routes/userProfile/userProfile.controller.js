import { runQueryOnDatabaseAndFetchEntireResult } from '../../models/database.model.js';
import crypto from 'crypto';

async function editLoggedUserInfo(req, res){
    const {firstNameTemp, lastNameTemp, emailTemp } = req.body;
    const sqlUpdateQuery = `UPDATE users SET
        email = "${emailTemp}", givenName = "${firstNameTemp}", familyName = "${lastNameTemp}" WHERE username = "${req.cookies.username}"`;
    
        try {
            await runQueryOnDatabaseAndFetchEntireResult(sqlUpdateQuery);
            res.send({ success: true, message: 'Profile data updated successfully' });
        } catch (error) {
            console.error('Failed to update profile data:', error);
            res.status(500).send({ success: false, message: 'Failed to update profile data' });
        }
}
async function getUserInfo(req, res){
    //get the info for the user in the cookie and send it in a json via res
    let sqlQuery = `SELECT * FROM users WHERE username = "${req.cookies.username}" AND password = "${req.cookies.pass}"`;
    
    //take the data and put it in a json and send it with res
    try {
        let results = await runQueryOnDatabaseAndFetchEntireResult(sqlQuery);
        
        if (results.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        const userData = results.map(user => {
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        });
    
        return res.json(userData);
      } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

}
async function logout(req, res){
    if (req.cookies && req.cookies.pass && req.cookies.username) {
        res.clearCookie('username', {
            httpOnly: true,
            sameSite: 'Strict'
          });

          res.clearCookie('pass', {
            httpOnly: true,
            sameSite: 'Strict'
          });
          return res.status(200).send({ success: false, message: 'User is logged out' }); 
    } else {
        return res.status(401).send({ success: false, message: 'User is not authenticated' });
    }
}
async function checkCookie(req, res){
    console.log("check cookie function");
    console.log(req.cookies);
    console.log(req);
    if (req.cookies && req.cookies.pass && req.cookies.username) {
        let sqlQuery = `SELECT * FROM users WHERE username = "${req.cookies.username}" AND password = "${req.cookies.pass}"`;
        let results = await runQueryOnDatabaseAndFetchEntireResult(sqlQuery);
        if (results.length === 0) {
            res.status(401).send({ success: false, message: 'Invalid cookies!' });
        }else{
            return res.status(200).send({ success: true, message: 'User is authenticated' });
        }
    } else {
        return res.status(401).send({ success: false, message: 'User is not authenticated' });
    }
}
async function checkCredentialsAgainstDatabase(req, res){
    
    const { username, password } = req.body;

    if (!username) {
        res.status(400).send({ success: false, message: 'Username field cannot be null!' });
        res.end();
        return; 
    }

    if (!password) {
        res.status(400).send({ success: false, message: 'Password field cannot be null!' });
        res.end();
        return; 
    }

    const hash = crypto.createHash('md5');
    hash.update(password);
    const hashedPassword = hash.digest('hex');

    let sqlQuery = `SELECT * FROM users WHERE username = "${username}" AND password = "${hashedPassword}"`;

    let results = await runQueryOnDatabaseAndFetchEntireResult(sqlQuery);

    if (results.length === 0) {
        res.status(401).send({ success: false, message: 'Login failed! Invalid username or password' });
    }
    else{
        if (!req.cookies || !req.cookies.pass ||!req.cookies.username ) {
            res.cookie('username', username, {
                httpOnly: true, 
                sameSite: 'Strict', 
                maxAge: 3600000  // 1 hour
            });
            res.cookie('pass', hashedPassword, {
                httpOnly: true,  
                sameSite: 'Strict', 
                maxAge: 3600000  
            });
        }else{
            console.log("Cookie already set");
        }
        res.status(200).send({ success: true, message: 'Login successful!' });
    }
    res.end();
}
async function addCredentialsToDatabase(req, res){
    const { givenName, familyName, username, email, password } = req.body;

    if (!givenName) {
        res.status(400).send({ success: false, message: 'Given Name field cannot be null!' });
        res.end();
        return; 
    }
    if (!familyName) {
        res.status(400).send({ success: false, message: 'Family Name field cannot be null!' });
        res.end();
        return; 
    }
    if (!username) {
        res.status(400).send({ success: false, message: 'Username field cannot be null!' });
        res.end();
        return; 
    }
    if (!email) {
        res.status(400).send({ success: false, message: 'Email field cannot be null!' });
        res.end();
        return; 
    }
    if (!password) {
        res.status(400).send({ success: false, message: 'Password field cannot be null!' });
        res.end();
        return; 
    }

    let sqlQuery = `SELECT * FROM users WHERE username = "${username}"`;

    let results = await runQueryOnDatabaseAndFetchEntireResult(sqlQuery);

    if (results.length > 0) {
        res.send({ success: false, message: 'Signup failed! Username already exists.' });
        res.end();
        return;
    }

    const hash = crypto.createHash('md5');
    hash.update(password);
    const hashedPassword = hash.digest('hex');

    let sqlInsertQuery = `INSERT INTO users (givenName, familyName, username, email, password, birthDate, height, weight, gender, needsSpecialAssistance, userAgreedToFetchData, activityIndex) VALUES ("${givenName}", "${familyName}", "${username}", "${email}", "${hashedPassword}", 
    "1990-01-01", 0, 0, "other", false, true, 0
    )`;
    console.log(sqlInsertQuery);
    let result = await runQueryOnDatabaseAndFetchEntireResult(sqlInsertQuery);
    if (result.error) {
        res.status(401).send({ success: false, message: 'An error occurred while signing up. Please try again later.' });
      } else {
        //set the cookie and redirect him to the health data page
        if (!req.cookies || !req.cookies.pass ||!req.cookies.username ) {
            res.cookie('username', username, {
                httpOnly: true, 
                // secure: true,    
                sameSite: 'Strict', 
                maxAge: 3600000  // 1 hour
            });
            res.cookie('pass', hashedPassword, {
                httpOnly: true,  
                // secure: true,    
                sameSite: 'Strict', 
                maxAge: 3600000  
            });
        }else{
            console.log("Cookie already set");
        }
        res.status(200).send({ success: true, message: 'Signup successful!' });
      }

      res.end();
}
async function saveHealthData(req, res) {
    const username = req.cookies.username;

    const {
        birthDate, height, weight, gender, needsSpecialAssistance, activityIndex
    } = req.body;

    if (!username) {
        return res.status(401).send({ success: false, message: 'User is not authenticated' });
    }

    const sqlSelectQuery = `SELECT birthDate, height, weight, gender, needsSpecialAssistance, activityIndex FROM users WHERE username = "${username}"`;
    
    try {
        const results = await runQueryOnDatabaseAndFetchEntireResult(sqlSelectQuery);
        if (results.length === 0) {
            return res.status(404).send({ success: false, message: 'User not found' });
        }

        const currentData = results[0];

        const updatedBirthDate = birthDate || currentData.birthDate;
        const updatedHeight = height || currentData.height;
        const updatedWeight = weight || currentData.weight;
        const updatedGender = gender || currentData.gender;
        const updatedNeedsSpecialAssistance = needsSpecialAssistance !== undefined ? (needsSpecialAssistance == true ? 1 : 0) : currentData.needsSpecialAssistance;
        const updatedActivityIndex = activityIndex !== 0 ? activityIndex : currentData.activityIndex;

        const sqlUpdateQuery = `UPDATE users SET
            birthDate = "${updatedBirthDate}", height = "${updatedHeight}", weight = "${updatedWeight}", gender = "${updatedGender}", needsSpecialAssistance = ${updatedNeedsSpecialAssistance},
            activityIndex = ${updatedActivityIndex}
            WHERE username = "${username}"`;

        await runQueryOnDatabaseAndFetchEntireResult(sqlUpdateQuery);
        res.send({ success: true, message: 'Health data updated successfully' });
    } catch (error) {
        console.error('Failed to update health data:', error);
        res.status(500).send({ success: false, message: 'Failed to update health data' });
    }
}


export {
    checkCredentialsAgainstDatabase,
    addCredentialsToDatabase,
    checkCookie,
    saveHealthData,
    logout,
    getUserInfo,
    editLoggedUserInfo
}
