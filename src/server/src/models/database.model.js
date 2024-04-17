import mysql from 'mysql'

var config = {
    host: "localhost",
    user: "root",
    password: "",
    database: "bookingiasi",
};

/*
 * @params sqlStatement: is the statement to be run -> anything that the table supports
 * @return either {error: true} -> if an error occured while running the script or {result: [] of JSON objects} -> the result from the database
 * The Function works async -> you need to await for the result
 */
const runQueryOnDatabaseAndFetchEntireResult = async (sqlStatement) => {
    var con = mysql.createConnection(config);

    const resultAfterConnection = await new Promise(async (resolveConnection) => {
        con.connect(async function (err) {
            if (err) {
                console.error("Encountered error " + err + " while connecting to the database");
                resolveConnection({error: true});
            } else {
                const queryResult = await new Promise(async (resolveQuery) => {
                    con.query(sqlStatement, function (err, result) {
                        if (err) {
                            console.error("Encountered error " + err + " while running the SQL statement.");
                            resolveQuery({
                                error: true,
                            });
                        } else resolveQuery(result);
                    });
                });
                resolveConnection(queryResult);
            }
        });
    });

    return resultAfterConnection;
};
/*
 * @params sqlStatement: is the statement to be run -> anything that the table supports
 * @return none
 * The Function works async -> don't await it at all
 */
const runAsyncQueryOnDatabase = async (sqlStatement) => {
    var con = mysql.createConnection(config);
    con.connect(async function (err) {
        if (err) console.error("Encountered error " + err + " while connecting to the database");
        else
            con.query(sqlStatement, function (err, result) {
                if (err)
                    console.error("Encountered error " + err + " while running the SQL statement.");
            });
    });
};

export {runQueryOnDatabaseAndFetchEntireResult, runAsyncQueryOnDatabase};
