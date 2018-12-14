const pg = require('pg');

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
//  Connect
const client = new pg.Client(conf.server);
client.connect(function (err) {
	if (err) {writeRes({status: "C Error", statusText: err});client.end();}
});
// checkEmty then getConfig
exports.getConfig = function(clientRes, user_name) {
	checkEmty(clientRes);

	queryString = "SELECT id, user_name, host, port, path, version FROM config WHERE user_name='"+user_name+"' LIMIT 1;";
	client.query(queryString, function (err, res) {
		if (err) {writeRes(clientRes, err);
		} else {
			if (res.rows.length <=0) {
				writeRes(clientRes,{err: "Null"});
			} else {
				writeRes(clientRes,res.rows);
			}
		}
	});
}
// checkEmty then setConfig
exports.setConfig = function(clientRes, config) {
	checkEmty(clientRes);

	queryString = "UPDATE config SET host='"+config.host
		+"', port="+config.port
		+", path='"+config.path
		+"', version='"+config.version
		+"' WHERE user_name='"+config.user_name+"';";
	console.log(queryString);
	client.query(queryString, function (err, res) {
		if (err) {writeRes(clientRes, err);
		} else {
			writeRes(clientRes,{status:"success"});
		}
	});
}

function checkEmty(clientRes){

	var queryString =
	"CREATE TABLE IF NOT EXISTS config ("+
		"id serial, user_name VARCHAR (25) UNIQUE,host VARCHAR (25),port integer,path VARCHAR (255),version VARCHAR (10),"+
		"CONSTRAINT config_pkey PRIMARY KEY (id)"+
	");";

	client.query(queryString, function (err, res) {
		if (err) {
			writeRes(clientRes,{status: "Q1 Error",statusText: err});
			client.end();
		} else {console.log("OK");}
	});

	queryString = "SELECT * FROM config LIMIT 1;";
	client.query(queryString, function (err, res) {
		if (err) {
			writeRes(err);client.end();
		} else if (res.rows.length <= 0) {
			queryString =
				"INSERT INTO config(user_name, host, port, path, version)"+
			  "VALUES ('ncteamvn', 'ncteamvn.com', 8080, 'control', '1.0');";
			client.query(queryString, function (err, res) {
				if (err) {writeRes(err);client.end();}
			});
		} else {console.log("RRE");}
	});

}

function writeRes(clientRes,obj) {
	clientRes.writeHead(200,{'Content-Type':'text/json'});
	clientRes.write(JSON.stringify(obj));
	clientRes.end();
}
// console.log(body);
