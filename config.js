const { Client } = require('pg');

exports.getTime = function() {
	var now;

	const client = new Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl: true
	});
	client.connect();

	client.query('SELECT NOW()', function(err, res) {
		now = {err, res};
	});
	return now;
}
// console.log(body);
