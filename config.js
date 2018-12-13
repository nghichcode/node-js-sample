const pg = require('pg');

exports.getTime = function(clientRes) {
	const conf = {
		local: {
		  user:"postgres",
		  database:"nodeex",
		  port:5433,
		  host:"localhost",
		  password:"12345678"
		},
		server: {
		  user:"khxbijdhccsjkc",
		  database:"d77n0qu161p9b3",
		  port:5432,
		  host:"ec2-54-204-40-248.compute-1.amazonaws.com",
		  password:"80fbc29fa8a5273e15db91d3b704ca76e7d7c8a024bb128b0d8342afaeb18a7f",
		  ssl:true
	}};

	const client = new pg.Client(conf.server);
	client.connect(function (err) {
		clientRes.writeHead(200,{'Content-Type':'text/json'});
		clientRes.write(JSON.stringify({status: "C Error", statusText: err}));
		clientRes.end();
		console.log(client);
		client.end();
	});

	client.query('SELECT NOW();', function (err, res) {
		if (err) {
			clientRes.writeHead(200,{'Content-Type':'text/json'});
			clientRes.write(JSON.stringify({status: "Q Error",statusText: err}));
			clientRes.end();
		} else {
			clientRes.writeHead(200,{'Content-Type':'text/json'});
			clientRes.write(JSON.stringify({o:1}));
			clientRes.end();
		}
		client.end();
	});
}
// console.log(body);
