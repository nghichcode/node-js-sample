var http = require('http');
const {Client} = require('pg');
var connect = "postgres://khxbijdhccsjkc:80fbc29fa8a5273e15db91d3b704ca76e7d7c8a024bb128b0d8342afaeb18a7f@ec2-54-204-40-248.compute-1.amazonaws.com:5432/d77n0qu161p9b3";

var getTime = function() {
	var now;

	const client = new Client({
	  connectionString: connect
	});
	client.connect();

	client.query('SELECT NOW()', function(err, res) {
		now = {err, res};
	});
	return now;
}

http.createServer(function (req, res) {
	res.writeHead(200,{'Content-Type':'text/json'});
	var resContent = getTime();
	res.write(JSON.stringify(resContent));
	res.end();
}).listen(process.env.PORT || 5000);
// console.log(body);
