const {Client} = require('pg');

exports.getTime = function() {
	var now="Errrr";
	var self = this;
	this.b=false;

	now = {status: "Error",statusText:"getTime 2"};
	const client = new Client({
	  connectionString: process.env.DATABASE_URL,
	  ssl: true
	});
	client.connect();
	now = {status: "Error",statusText:"getTime 3"};

	client.query('SELECT NOW();', (err, res) => {
		now = {status: "Error",statusText:"getTime 5"};
		if (err) {
			self.b={status: "Error",statusText:"getTime Err"};
			now ={status: "Error",statusText:"getTime Err"};
		} else {
			self.b={status: "Error",statusText:"getTime OK"};
			now = {status: "Error",statusText:"getTime OK"};
		}
		client.end();
	});
	now = {status: "Error",statusText:"getTime 4"};

	if (self.b!= false) {return self.b;}
	return now;
}
// console.log(body);
