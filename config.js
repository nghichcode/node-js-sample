const { Client } = require('pg');

exports.getTime = function() {
	var now="Errrr";

	const client = new Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl: true
	});
	client.connect();

	// client.query('SELECT NOW()', function(err, res) {
	// 	console.log("query");
	// 	if (err) {console.log("Err");return;}
	//   for (let row of res.rows) {
	//     console.log(JSON.stringify(row));
	//   }
	// 	now = {rk:"OK"};
	// });

	return now;
}
// console.log(body);
