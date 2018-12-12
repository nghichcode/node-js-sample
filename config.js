const { Client } = require('pg');

exports.getTime = function() {
	var now;

	const client = new Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl: true
	});
	client.connect();

	client.query('SELECT NOW()', function(err, res) {
		if (err) throw err;
	  for (let row of res.rows) {
	    console.log(JSON.stringify(row));
	  }
		now = {rk:res};
	});
	return now;
}
// console.log(body);
