const {Client} = require('pg');

exports.getTime = function() {
	var now="Errrr";

	now = {status: "Error",statusText:"getTime 2"};
	const client = new Client({
	  connectionString: process.env.DATABASE_URL
	});
	client.connect();
	now = {status: "Error",statusText:"getTime 3"};

	client.query('SELECT NOW()', function(err, res) {
		console.log("query");
		if (err) {
			now ={status: "Error",statusText:"getTime Err"} ;
		} else {
			now = {status: "Error",statusText:"getTime OK"};
		}
	});

	return now;
}
// console.log(body);
