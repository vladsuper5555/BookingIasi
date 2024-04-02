const mysql = require('mysql');
// You might need to adjust these details according to your database configuration
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "BookingIasi" // Ensure this matches your actual database name
});

beforeAll(done => {
  con.connect(err => {
    if (err) return done(err);
    console.log('Connected to the database for testing.');
    done();
  });
});

afterAll(done => {
  con.end(err => {
    if (err) return done(err);
    console.log('Disconnected from the database.');
    done();
  });
});

test('check if name "Ion" exists in test table', done => {
  const query = 'SELECT * FROM test WHERE name = "Ion"';
  con.query(query, (err, result) => {
    expect(err).toBeNull();
    expect(result).not.toBeNull();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].name).toEqual('Ion');
    done();
  });
});
