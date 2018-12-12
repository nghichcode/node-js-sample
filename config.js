const {Client} = require('pg');

exports.getTime = function() {
	var now="Errrr";

	const client = new Client({
	  connectionString: process.env.DATABASE_URL || "postgres://khxbijdhccsjkc:80fbc29fa8a5273e15db91d3b704ca76e7d7c8a024bb128b0d8342afaeb18a7f@ec2-54-204-40-248.compute-1.amazonaws.com:5432/d77n0qu161p9b3"
	});
	client.connect();

	client.query('SELECT NOW()', function(err, res) {
		console.log("query");
		if (err) {console.log("Err");return;}
		now = res;
	});

	return now;
}
// console.log(body);
