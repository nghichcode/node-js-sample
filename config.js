const {Client} = require('pg');
const http = require('http');
var connect = "postgres://khxbijdhccsjkc:80fbc29fa8a5273e15db91d3b704ca76e7d7c8a024bb128b0d8342afaeb18a7f@ec2-54-204-40-248.compute-1.amazonaws.com:5432/d77n0qu161p9b3";

exports.getTime = function() {
	const client = new Client({
	  connectionString: connect
	});
	client.connect();

	client.query('SELECT NOW()', function(err, res) {
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write(JSON.stringify(err)+"<br/>"+ JSON.stringify(res));
		res.end();
	});
}
// console.log(body);
